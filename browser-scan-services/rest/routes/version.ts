import { MountOptions, RequestHandlerType } from "restify";
import { getAvailableVersionOfBrowser } from "@browser-scan/scanner";

export const versionRoutes: MountOptions = {
  method: "GET",
  path: "/versions/:browser",
  url: "/versions/:browser",
  name: "Versions",
};
const getVersions: RequestHandlerType = async (req, res, next) => {
  try {
    const { browser } = req.params;
    const availableVersions = getAvailableVersionOfBrowser(browser);
    res.send(availableVersions);
    res.end();
    next();
  } catch (e) {
    next(e);
  }
};

export const versionRoutesHandlers: RequestHandlerType = [getVersions];
