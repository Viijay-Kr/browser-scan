import { getAvailableBrowsers } from "../browsers";

describe("Browsers", () => {
  const browsers_list = {
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
  };

  it("should respond with the set of browsers [getAvailableBrowsers]", () => {
    const result = getAvailableBrowsers();
    expect(result).toEqual({
      supported_browsers: browsers_list,
    });
  });
});
