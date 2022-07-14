import { NonStreamScannerRequest, ScannerResponse } from "@browser-scan/schema";
export declare const scanFile: ({ params, done, error, }: {
    params: NonStreamScannerRequest;
    done: (result: ScannerResponse) => void;
    error: (err: any) => void;
}) => Promise<void>;
//# sourceMappingURL=fileScanner.d.ts.map