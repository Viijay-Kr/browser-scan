import { RequestHandler } from "restify";

const browser_list_to_browsers = {
  "Android Chrome": "and_chr",
  "Android Firefox": "and_ff",
  "Android UC": "and_uc",
  "iOS Safari": "ios_saf",
  "Opera Mobile": "op_mob",
  Android: "android",
  Chrome: "chrome",
  Firefox: "firefox",
  "Opera Mini": "op_mini",
  Opera: "opera",
  Safari: "safari",
  Edge: "edge",
  Samsung: "samsung",
};
export const browsersList: RequestHandler = (_, res, next) => {
  res.send({
    browsers_list: browser_list_to_browsers,
  });
  res.status(200);
  next();
};
