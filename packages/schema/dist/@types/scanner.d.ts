import { Browsers } from "./browsers";
export declare type ProjectPath = string;
declare type Line = string;
declare type Column = string;
declare type NonCompatibleProperty = string;
export declare type NonCompatibleTuple = [`${Line}:${Column}`, NonCompatibleProperty];
export interface StreamScannerRequest {
    browser: Browsers;
    version: string;
    path: ProjectPath;
}
export interface NonStreamScannerRequest {
    browser: Browsers;
    version: string;
    file: string;
}
export interface ScannerResponse {
    scanned_result: {
        [file: string]: NonCompatibleTuple[];
    };
}
export {};
