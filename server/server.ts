import restify, { RequestHandler } from "restify";
import corsMiddleware from "restify-cors-middleware";
import { browsersList } from "./browsers";
import { save_in_cache } from "./in_memory";
import { start_scanning } from "./scanner";
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

server.post(
  {
    name: "scan",
    contentType: "application/json",
    url: "/scan",
  },
  [save_in_cache, start_scanning]
);

server.get(
  {
    name: "browsers",
    contentType: "application/json",
    url: "/browsers",
  },
  [browsersList]
);

server.listen(8080, function () {
  console.log("%s listening at %s", server.name, server.url);
});
