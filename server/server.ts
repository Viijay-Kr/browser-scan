import restify, { RequestHandler } from "restify";
import corsMiddleware from "restify-cors-middleware";
import { browsersList, browserVersions } from "./browsers";
import { save_in_cache } from "./in_memory";
import { file_scanner, stream_scanner_async } from "./scanner";
const server = restify.createServer();

const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["*"],
  exposeHeaders: ["*"],
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(
  restify.plugins.bodyParser({
    mapFiles: true,
    mapParams: true,
  })
);

server.get(
  {
    name: "browsers",
    contentType: "application/json",
    url: "/browsers",
  },
  [browsersList]
);

server.get(
  {
    name: "browser_versions",
    contentType: "application/json",
    url: "/versions/:browser",
  },
  [browserVersions]
);

server.post(
  {
    name: "stream_scan",
    url: "/scan/stream",
    contentType: "application/json",
  },
  [save_in_cache, stream_scanner_async]
);

server.post(
  {
    name: "file_scanner",
    url: "/scan/file",
    contentType: "appliccation/json",
  },
  [save_in_cache, file_scanner]
);

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
