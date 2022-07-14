import { StreamScannerRequest, ScannerResponse, NonStreamScannerRequest } from "@browser-scan/schema";
export declare const useStreamScanner: () => {
    isStreamingResults: boolean;
    startStreaming: (body: StreamScannerRequest) => Promise<void>;
    streamedResponse: ScannerResponse;
};
export declare const useFileScanner: () => {
    data: ScannerResponse | undefined;
    isSuccess: boolean;
    scanFile: import("react-query").UseMutateFunction<ScannerResponse, unknown, NonStreamScannerRequest, unknown>;
    isLoading: boolean;
};
//# sourceMappingURL=useScanner.d.ts.map