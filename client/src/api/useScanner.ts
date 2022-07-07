import { useMutation } from "react-query";
import axios from "axios";
import { CompatibilityTuple } from "./types";
import { useState } from "react";

type RequestBody = {
  version: string;
  project_path: string;
  browser: string;
};

export const useStreamScanner = () => {
  const [streamedResponseCopy, setStreamedResponse] = useState<
    Record<string, CompatibilityTuple[]> | undefined
  >(undefined);
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
          const decoded_string = new TextDecoder().decode(readResult?.value);
          const [, message] = decoded_string.split("\r\n");
          setStreamedResponse((prev) => {
            if (message) {
              try {
                return {
                  ...prev,
                  ...JSON.parse(message),
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
  const stream = async (body: RequestBody) => {
    setIsStreamingResults(true);
    setStreamedResponse({});
    fetch("http://localhost:8080/scan/stream", {
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
    stream,
    streamedResponse: streamedResponseCopy
      ? {
          scanned_result: Object.entries(streamedResponseCopy).reverse(),
        }
      : undefined,
  };
};

export const useFileScanner = () => {
  const { data, isSuccess, mutate, isLoading } = useMutation(
    "scanner/file",
    async (body: RequestBody) => {
      const res = await axios.post<{ [key: string]: CompatibilityTuple[] }>(
        "/scan/file",
        body,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.info(res.data);
      return res.data;
    }
  );
  return {
    data: data
      ? {
          scanned_result: Object.entries(data),
        }
      : undefined,
    isSuccess,
    mutate,
    isLoading,
  };
};
