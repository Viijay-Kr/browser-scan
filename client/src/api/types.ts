type Line = string;
type Column = string;
type Feature = string;
export type CompatibilityTuple = [`${Line}:${Column}`, Feature];

export interface ScannerResponse {
  scanned_result: Array<{
    file: string;
    compatability_tuple: CompatibilityTuple[];
  }>;
}
export interface BrowsersResponse {
  browsers_list: Record<string, string>;
}

export type StreamedResponse = [string, CompatibilityTuple[]][];
