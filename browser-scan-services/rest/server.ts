import restify from "restify";
import corsMiddleware from "restify-cors-middleware";
import getRouter from "./routes";

const server = restify.createServer({
  router: getRouter(),
});

const cors = corsMiddleware({
  origins: ["http://localhost:3000"],
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

export const startServer = () => {
  try {
    server.listen(8081, () => {
      console.log("%s listening at %s", server.name, server.url);
    });
  } catch (e) {
    console.error(e);
  }
};
export const serveStatic = (basePath: string, assetsPath: string) => {
  try {
    server.get("/", restify.plugins.serveStatic({
      directory: basePath,
      default: "index.html",
    }))
    server.get("/static/*", restify.plugins.serveStaticFiles(assetsPath, {
      maxAge: 360000,
    }))
  } catch (e) {
    throw new Error('Path not accessible')
  }
}
export { server }

if (process.env.RUN_SEVER) {
  startServer();
}