"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.serveStatic = exports.startServer = void 0;
const restify_1 = __importDefault(require("restify"));
const restify_cors_middleware_1 = __importDefault(require("restify-cors-middleware"));
const routes_1 = __importDefault(require("./routes"));
const server = restify_1.default.createServer({
    router: (0, routes_1.default)(),
});
exports.server = server;
const cors = (0, restify_cors_middleware_1.default)({
    origins: ["http://localhost:3000"],
    allowHeaders: ["*"],
    exposeHeaders: ["*"],
});
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify_1.default.plugins.bodyParser({
    mapFiles: true,
    mapParams: true,
}));
const startServer = () => {
    try {
        server.listen(8081, () => {
            console.log("%s listening at %s", server.name, server.url);
        });
    }
    catch (e) {
        console.error(e);
    }
};
exports.startServer = startServer;
const serveStatic = (basePath, assetsPath) => {
    try {
        server.get("/", restify_1.default.plugins.serveStatic({
            directory: basePath,
            default: "index.html",
        }));
        server.get("/static/*", restify_1.default.plugins.serveStaticFiles(assetsPath, {
            maxAge: 360000,
        }));
    }
    catch (e) {
        throw new Error('Path not accessible');
    }
};
exports.serveStatic = serveStatic;
if (process.env.RUN_SEVER) {
    (0, exports.startServer)();
}
