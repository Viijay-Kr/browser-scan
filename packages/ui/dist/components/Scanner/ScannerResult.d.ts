import React from "react";
import { ScannerResponse, Browsers } from "@browser-scan/schema";
export interface ScannerResultProps {
    result: ScannerResponse;
    browser?: Browsers;
    project_path?: string;
    version?: string;
}
export declare const ScannerResult: React.FC<ScannerResultProps>;
