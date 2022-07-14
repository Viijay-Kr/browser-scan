import { Browsers } from "@browser-scan/schema";
import { scanFile } from "../fileScanner";
import path from "path";

describe("Scan File", () => {
  it("should scan a single file and give the result", async () => {
    const done = jest.fn();
    const error = jest.fn();
    const file_path = path.resolve(__dirname, "./mocks/test_file.css");
    await scanFile({
      params: {
        browser: "chrome" as Browsers,
        version: "103",
        file: file_path,
      },
      done,
      error,
    });
    expect(done).toBeCalledWith({
      scanned_result: {
        [file_path]: [],
      },
    });
  });
});
