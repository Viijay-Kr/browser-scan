import { bunyan, type Router as RouterClass } from "restify";
// @ts-ignore
import Router from "restify/lib/router";
import { browserRouteHandlers, browsersRoute } from "./browser";
import {
  streamScannerRouteHandler,
  streamScannerRoute,
  fileScannerRoute,
  fileScannerRouteHandler,
} from "./scanner";
import { versionRoutes, versionRoutesHandlers } from "./version";

const router: RouterClass = new Router({
  log: bunyan.createLogger("Routes"),
});

router.mount(browsersRoute, browserRouteHandlers);
router.mount(versionRoutes, versionRoutesHandlers);
router.mount(streamScannerRoute, streamScannerRouteHandler);
router.mount(fileScannerRoute, fileScannerRouteHandler);

export default function getRouter() {
  return router;
}
