import { MountOptions, RequestHandlerType, RequestHandler } from "restify";
import { getAvailableBrowsers } from "@browser-scan/scanner";

export const browsersRoute: MountOptions = {
  method: "GET",
  url: "/browsers",
  contentType: "application/json",
  name: "Browsers",
  path: "/browsers",
};

const getSupportedBrowsers: RequestHandler = (req, res, next) => {
  try {
    const supported_browsers = getAvailableBrowsers();
    res.send(supported_browsers);
    res.end();
    next();
  } catch (e) {
    res.send(e);
    next(e);
  }
};

export const browserRouteHandlers: RequestHandlerType = [getSupportedBrowsers];
