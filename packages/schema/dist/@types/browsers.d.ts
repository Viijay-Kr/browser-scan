export declare enum Browsers {
    "Android Chrome" = "and_chr",
    "Android Firefox" = "and_ff",
    "Android UC" = "and_uc",
    "iOS Safari" = "ios_saf",
    "Opera Mobile" = "op_mob",
    "Android" = "android",
    "Chrome" = "chrome",
    "Firefox" = "firefox",
    "Opera Mini" = "op_mini",
    "Opera" = "opera",
    "Safari" = "safari",
    "Edge" = "edge",
    "Samsung" = "samsung"
}
export interface BrowsersResponse {
    supported_browsers: Record<Browsers, keyof typeof Browsers>;
}
export interface VersionsResponse {
    supported_versions: string[];
}
