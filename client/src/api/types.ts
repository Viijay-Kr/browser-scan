type Line = string;
type Column = string;
type Feature = string;
type CompatibilityTuple = [`${Line}:${Column}`, Feature];

export interface ScannerResponse {
  browser: string;
  version: string;
  scanned_result: Array<{
    file: string;
    compatability_tuple: CompatibilityTuple[];
  }>;
}
