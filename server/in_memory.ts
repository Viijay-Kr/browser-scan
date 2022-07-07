import { RequestHandler } from "restify";

const mem_cache = new Map<"path" | "browser" | "version", string>();

export const save_in_cache: RequestHandler = (req, _, next) => {
  const path = req.body.project_path;
  const browser = req.body.browser;
  const version = req.body.version;
  try {
    saveInCache({
      browser,
      path,
      version,
    });
    next();
  } catch (e) {
    throw e;
  }
};

export const saveInCache = ({
  browser,
  path,
  version,
}: {
  browser: string;
  path: string;
  version: string;
}) => {
  mem_cache.set("browser", browser);
  mem_cache.set("path", path);
  mem_cache.set("version", version);
};
export default function getCache() {
  return mem_cache;
}
