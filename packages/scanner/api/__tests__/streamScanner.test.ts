import { scanFilesInChunks } from "../streamScanner";
import path from "path";
import { Browsers } from "@browser-scan/schema";

describe("Stream Scanner", () => {
  it("should scan all the files in a given folder asynchronously", async () => {
    const done = jest.fn();
    const error = jest.fn();
    const stream = jest.fn();
    const folder_path = path.resolve(__dirname, "./mocks/test_project");
    await scanFilesInChunks({
      params: {
        browser: "chrome" as Browsers,
        version: "103",
        path: folder_path,
      },
      done,
      error,
      stream,
    });
    expect(error).toBeCalledTimes(0);
    expect(stream).toBeCalledTimes(3);
    expect(done).toBeCalledTimes(1);
    expect(done).toBeCalledWith({
      scanned_result: {
        [path.resolve(__dirname, "./mocks/test_project/index.css")]: [],
        [path.resolve(__dirname, "./mocks/test_project/test_app/index.less")]:
          [],
        [path.resolve(__dirname, "./mocks/test_project/test_app/app.less")]: [],
      },
    });
  });
});
