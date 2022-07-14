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
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Transfer-Encoding": "chunked",
        });
        await (0, api_1.scanFilesInChunks)({
            params: {
                browser,
                version,
                path,
            },
            done(result) {
                console.log(result);
                res.end(JSON.stringify(result));
                next();
            },
            error(error) {
                console.warn(error);
            },
            stream(chunk) {
                res.write(JSON.stringify(chunk));
            },
        });
    }
    catch (e) {
        next(e);
    }
};
exports.fileScannerRouteHandler = [fileScanner];
exports.streamScannerRouteHandler = [streamScanner];
