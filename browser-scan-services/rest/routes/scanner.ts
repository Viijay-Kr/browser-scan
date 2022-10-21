import { MountOptions, RequestHandler } from "restify";
import { scanFile, scanFilesInChunks } from "@browser-scan/scanner/dist/api";

export const fileScannerRoute: MountOptions = {
  method: "POST",
  name: "File Scanner",
  path: "/scan/file",
  url: "/scan/file",
};

export const streamScannerRoute: MountOptions = {
  name: "Stream Scanner",
  path: "/scan/stream",
  url: "/scan/stream",
  method: "POST",
};

const fileScanner: RequestHandler = async (req, res, next) => {
  try {
    const { browser, version, file } = req.body;
    scanFile({
      params: {
        browser,
        version,
        file,
      },
      done: (result) => {
        res.send(result);
        next();
      },
      error: (err) => next(err),
    });
  } catch (e) {
    next(e);
  }
};

const streamScanner: RequestHandler = async (req, res, next) => {
  try {
    const { browser, version, path } = req.body;
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Encoding", "chunked");
    scanFilesInChunks({
      params: {
        browser,
        version,
        path,
      },
      done(result) {
        res.end(JSON.stringify(result));
        next();
      },
      error(error) {
        console.warn(error);
      },
      stream(chunk) {
        const filtered = Object.keys(chunk.scanned_result).reduce((acc, file) => chunk.scanned_result[file].length ? { ...acc, [file]: chunk.scanned_result[file] } : acc, {})
        const chunks = JSON.stringify(filtered);
        const chunkSize = chunks.length;
        res.write(`
        ${chunkSize}\r\n
        ${chunks}
        `);
      },
    });
  } catch (e) {
    //  next(e);
  }
};

export const fileScannerRouteHandler = [fileScanner];
export const streamScannerRouteHandler = [streamScanner];
