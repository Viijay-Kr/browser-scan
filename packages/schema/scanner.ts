import { Browsers } from "./browsers";

export type ProjectPath = string;

type Line = string;
type Column = string;
type NonCompatibleProperty = string;
export type NonCompatibleTuple = [`${Line}:${Column}`, NonCompatibleProperty];

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
