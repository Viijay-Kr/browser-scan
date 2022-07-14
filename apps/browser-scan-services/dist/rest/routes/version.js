"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.versionRoutesHandlers = exports.versionRoutes = void 0;
const scanner_1 = require("@browser-scan/scanner");
exports.versionRoutes = {
    method: "GET",
    path: "/versions/:browser",
    url: "/versions/:browser",
    name: "Versions",
};
const getVersions = async (req, res, next) => {
    try {
        const { browser } = req.params;
        const availableVersions = (0, scanner_1.getAvailableVersionOfBrowser)(browser);
        res.send(availableVersions);
        res.end();
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.versionRoutesHandlers = [getVersions];
