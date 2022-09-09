"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamScannerRouteHandler = exports.fileScannerRouteHandler = exports.streamScannerRoute = exports.fileScannerRoute = void 0;
const api_1 = require("@browser-scan/scanner/dist/api");
exports.fileScannerRoute = {
    method: "POST",
    name: "File Scanner",
    path: "/scan/file",
    url: "/scan/file",
};
exports.streamScannerRoute = {
    name: "Stream Scanner",
    path: "/scan/stream",
    url: "/scan/stream",
    method: "POST",
};
const fileScanner = async (req, res, next) => {
    try {
        const { browser, version, file } = req.body;
        (0, api_1.scanFile)({
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
    }
    catch (e) {
        next(e);
    }
};
const streamScanner = async (req, res, next) => {
    try {
        const { browser, version, path } = req.body;
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Encoding", "chunked");
        (0, api_1.scanFilesInChunks)({
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
                const filtered = Object.keys(chunk.scanned_result).reduce((acc, file) => chunk.scanned_result[file].length ? Object.assign(Object.assign({}, acc), { [file]: chunk.scanned_result[file] }) : acc, {});
                const chunks = JSON.stringify(filtered);
                const chunkSize = chunks.length;
                res.write(`
        ${chunkSize}\r\n
        ${chunks}
        `);
            },
        });
    }
    catch (e) {
        //  next(e);
    }
};
exports.fileScannerRouteHandler = [fileScanner];
exports.streamScannerRouteHandler = [streamScanner];
