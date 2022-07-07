import { RequestHandler } from "restify";
import BrowserSelection from "doiuse/lib/browsers";
const browser_list_to_browsers = {
  and_chr: "Android Chrome",
  and_ff: "Android Firefox",
  and_uc: "Android UC",
  ios_saf: "iOS Safari",
  op_mob: "Opera Mobile",
  android: "Android",
  chrome: "Chrome",
  firefox: "Firefox",
  op_mini: "Opera Mini",
  opera: "Opera",
  safari: "Safari",
  edge: "Edge",
  samsung: "Samsung",
};

export const browsersList: RequestHandler = (_, res, next) => {
  res.send({
    browsers_list: browser_list_to_browsers,
  });
  res.status(200);
  next();
};

export const browserVersions: RequestHandler = (req, res, next) => {
  try {
    const browser = req.params?.browser;
    const versions = new BrowserSelection(`${browser} >=1`)
      .list()
      .map(([_, version]) => version);
    res.send(versions);
    next();
  } catch (e) {
    next(e);
  }
};
