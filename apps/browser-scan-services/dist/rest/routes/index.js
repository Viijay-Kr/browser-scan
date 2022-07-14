"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = require("restify");
// @ts-ignore
const router_1 = __importDefault(require("restify/lib/router"));
const browser_1 = require("./browser");
const scanner_1 = require("./scanner");
const version_1 = require("./version");
const router = new router_1.default({
    log: restify_1.bunyan.createLogger("Routes"),
});
router.mount(browser_1.browsersRoute, browser_1.browserRouteHandlers);
router.mount(version_1.versionRoutes, version_1.versionRoutesHandlers);
router.mount(scanner_1.streamScannerRoute, scanner_1.streamScannerRouteHandler);
router.mount(scanner_1.fileScannerRoute, scanner_1.fileScannerRouteHandler);
function getRouter() {
    return router;
}
exports.default = getRouter;
