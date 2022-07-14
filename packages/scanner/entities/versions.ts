import { Browsers, VersionsResponse } from "@browser-scan/schema";
import BrowserSelection from "doiuse/lib/browsers";

export const getAvailableVersionOfBrowser = (
  browser: Browsers
): VersionsResponse => {
  return {
    supported_versions: new BrowserSelection(`${browser} >=1`)
      .list()
      .map(([_, version]) => version),
  };
};
