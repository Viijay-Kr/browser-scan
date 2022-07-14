import { BrowsersResponse } from "@browser-scan/schema";

export const getAvailableBrowsers = (): BrowsersResponse => {
  return {
    supported_browsers: {
      and_chr: "Android Chrome",
      and_ff: "Android Firefox",
      and_uc: "Android UC",
      ios_saf: "iOS Safari",
      op_mob: "Opera Mobile",
      android: "Android",
      chrome: "Chrome",
      firefox: "Firefox",
      op_mini: "Opera Mini",
      opera: "Opera",
      safari: "Safari",
      edge: "Edge",
      samsung: "Samsung",
    },
  };
};
