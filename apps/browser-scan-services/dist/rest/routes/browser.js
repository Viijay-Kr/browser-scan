"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserRouteHandlers = exports.browsersRoute = void 0;
const scanner_1 = require("@browser-scan/scanner");
exports.browsersRoute = {
    method: "GET",
    url: "/browsers",
    contentType: "application/json",
    name: "Browsers",
    path: "/browsers",
};
const getSupportedBrowsers = (req, res, next) => {
    try {
        const supported_browsers = (0, scanner_1.getAvailableBrowsers)();
        res.send(supported_browsers);
        res.end();
        next();
    }
    catch (e) {
        res.send(e);
        next(e);
    }
};
exports.browserRouteHandlers = [getSupportedBrowsers];
