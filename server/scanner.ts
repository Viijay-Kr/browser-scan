import getCache from "./in_memory";
import { RequestHandler } from "restify";
import postcss from "postcss";
import doiuse from "doiuse";
import { resolve } from "path";
import { readFileSync, readdirSync, statSync } from "fs";

type Line = string;
type Column = string;
type Feature = string;
type CompatibilityTuple = [`${Line}:${Column}`, Feature];
interface ScannerResponse {
  browser: string;
  version: string;
  scanned_result: Array<{
    file: string;
    compatability_tuple: CompatibilityTuple[];
  }>;
}

const getCssfilesRecursively = (dir: string): string[] => {
  let results: string[] = [];
  readdirSync(dir).forEach((innerDir) => {
    const inner_dir_path = resolve(dir, innerDir);
    const stat = statSync(inner_dir_path);

    if (stat.isDirectory()) {
      results = results.concat(getCssfilesRecursively(inner_dir_path));
    }
    if (
      (stat.isFile() && inner_dir_path.endsWith("css")) ||
      inner_dir_path.endsWith("scss")
    ) {
      results.push(inner_dir_path);
    }
  });
  return results;
};
export const start_scanning: RequestHandler = async (_, res, next) => {
  try {
    const cache = getCache();
    const { path, browser, version } = Object.fromEntries(cache);
    const cssFiles = getCssfilesRecursively(path);
    const scanned_result: ScannerResponse["scanned_result"] = [];
    const processing_promises = cssFiles.map((filename, index) => {
      const css = readFileSync(filename);
      scanned_result[index] = {
        file: filename,
        compatability_tuple: [],
      };
      return postcss(
        doiuse({
          browsers: [`${browser} ${version}`, "> 1%"],
          ignore: ["rem"], // an optional array of features to ignore
          onFeatureUsage: function (usageInfo: any) {
            scanned_result[index].compatability_tuple.push(
              parse_result(usageInfo.message)
            );
          },
        })
      ).process(css.toString(), {
        from: undefined,
      });
    });
    await Promise.all(processing_promises).catch((e) => {});
    res.send({
      browser,
      version,
      scanned_result: scanned_result.filter(
        ({ compatability_tuple }) => !!compatability_tuple.length
      ),
    });
    next();
  } catch (e) {
    // throw e;
  }
};

const parse_result = (message: string): CompatibilityTuple => {
  const [_, line_num, col_num, ...rest] = message.split(":");
  return [`${line_num}:${col_num}`, rest.join("")];
};
