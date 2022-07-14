import { ScannerResponse, StreamScannerRequest } from "@browser-scan/schema";
export declare const scanFilesInChunks: ({ params, stream, done, error, }: {
    params: StreamScannerRequest;
    /** A Callback to process the chunks */
    stream: (chunk: Partial<ScannerResponse["scanned_result"]>) => void;
    /** A Callback to indicate the scanning is complete */
    done: (result: ScannerResponse) => void;
    /** Callback triggering an error in processing */
    error: (error: any) => void;
}) => Promise<void>;
//# sourceMappingURL=streamScanner.d.ts.map