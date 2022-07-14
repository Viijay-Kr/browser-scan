import { useState } from "react";
import {
  StreamScannerRequest,
  ScannerResponse,
  NonStreamScannerRequest,
} from "@browser-scan/schema";
import { useMutation } from "react-query";

export const useStreamScanner = () => {
  const [streamedResponse, setStreamedResponse] = useState<ScannerResponse>({
    scanned_result: {},
  });
  const [isStreamingResults, setIsStreamingResults] = useState(false);

  const readChunks = (
    reader: ReadableStreamDefaultReader<Uint8Array> | undefined
  ) => {
    return {
      async *[Symbol.asyncIterator]() {
        let readResult = await reader?.read();
        while (!readResult?.done) {
          yield readResult?.value;
          readResult = await reader?.read();
          console.info("readResult?.value", readResult?.value);
          const decoded_string = new TextDecoder().decode(readResult?.value);
          console.info(decoded_string);
          const [, message] = decoded_string.split("\r\n");
          setStreamedResponse((prev) => {
            if (message) {
              try {
                return {
                  scanned_result: {
                    ...prev["scanned_result"],
                    ...JSON.parse(message ?? {}),
                  },
                };
              } catch (e) {
                console.warn(e, message);
                return prev;
              }
            }
            return prev;
          });
        }
      },
    };
  };
  const startStreaming = async (body: StreamScannerRequest) => {
    setIsStreamingResults(true);
    setStreamedResponse({
      scanned_result: {},
    });
    fetch("/scan/stream", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    }).then(async (response) => {
      const reader = response.body?.getReader();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of readChunks(reader)) {
      }
      setIsStreamingResults(false);
      return reader;
    });
  };
  return {
    isStreamingResults,
    startStreaming,
    streamedResponse,
  };
};

export const useFileScanner = () => {
  const {
    data,
    isSuccess,
    mutate: scanFile,
    isLoading,
  } = useMutation("scanner/file", async (body: NonStreamScannerRequest) => {
    const res = await fetch("/scan/file", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });
    const res_1 = await res.json();
    return res_1 as ScannerResponse;
  });
  return {
    data,
    isSuccess,
    scanFile,
    isLoading,
  };
};
