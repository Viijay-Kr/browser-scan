"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const restify_cors_middleware_1 = __importDefault(require("restify-cors-middleware"));
const routes_1 = __importDefault(require("./routes"));
const server = restify_1.default.createServer({
    router: (0, routes_1.default)(),
});
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
const start = () => {
    try {
        server.listen(8081, () => {
            console.log("%s listening at %s", server.name, server.url);
        });
    }
    catch (e) {
        console.error(e);
    }
};
start();
