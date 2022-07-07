import getCache from "./in_memory";
import { RequestHandler, type Response } from "restify";
import postcss, { ProcessOptions } from "postcss";
import postcssScss from "postcss-scss";
import doiuse from "doiuse";
import { resolve as path_resolve, join, resolve } from "path";

import {
  readFileSync,
  readdirSync,
  statSync,
  readFile,
  promises as fsp,
} from "fs";
import syntax from "postcss-less";

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

interface ScannerResponseAsync {
  scanned_result: Record<string, CompatibilityTuple[]>;
}

const getFilesRecursivelyAsync = async (
  dir: string,
  scanning_promises: Array<Promise<string>>,
  resolveFile: (file: string) => Promise<string>
) => {
  let files = await fsp.readdir(dir, { withFileTypes: true });
  for (const f of files) {
    const full_path = join(dir, f.name);
    if (!f.name.match(/node_modules/) && !f.name.match(/git/)) {
      if (f.isDirectory()) {
        await getFilesRecursivelyAsync(
          full_path,
          scanning_promises,
          resolveFile
        );
      }
      if (
        (f.isFile() && f.name.endsWith(".css")) ||
        f.name.endsWith(".scss") ||
        f.name.endsWith(".less")
      ) {
        scanning_promises.push(resolveFile(full_path));
      }
    }
  }
  return scanning_promises;
};

const parse_result = (message: string): CompatibilityTuple => {
  const [_, line_num, col_num, ...rest] = message.split(":");
  return [`${line_num}:${col_num}`, rest.join("")];
};

export const stream_scanner_async: RequestHandler = async (_, res, next) => {
  try {
    const cache = getCache();
    const { path, browser, version } = Object.fromEntries(cache);
    console.info("Scanning files...");

    const scanned_result: ScannerResponseAsync["scanned_result"] = {};

    const resolveFile = (file: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!scanned_result[file]) {
          scanned_result[file] = [];
        }
        const plugins = [
          doiuse({
            browsers: [`${browser} ${version}`],
            ignore: ["rem"], // an optional array of features to ignore
            onFeatureUsage: function (usageInfo: any) {
              const message = parse_result(usageInfo.message);
              scanned_result[file].push(message);
            },
          }),
        ];
        readFile(file, (err, content) => {
          if (err) {
            resolve(file);
          }
          const processOptions: ProcessOptions = {
            from: undefined,
          };
          if (file.endsWith("less")) {
            processOptions["syntax"] = syntax;
          }
          postcss(plugins)
            .process(content.toString(), processOptions)
            .catch(() => {
              console.warn(
                "error occured while parsing =>",
                file,
                "=> this file will be discarded"
              );
              resolve(file);
            })
            .then(() => {
              if (scanned_result[file].length) {
                const chunk = JSON.stringify({
                  [file]: scanned_result[file],
                });
                const chunkSize = chunk.length;
                res.write(`
                    ${chunkSize}\r\n
                    ${chunk}
                  `);
              }
              resolve(file);
            });
        });
      });
    };

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    });
    const scanning_promises = await getFilesRecursivelyAsync(
      path,
      [],
      resolveFile
    );
    await Promise.all(scanning_promises);
    console.info("Scanning is Complete");
    res.end(JSON.stringify(scanned_result));
    next();
  } catch (e) {
    console.error(e);
    next();
  }
};

export const file_scanner: RequestHandler = async (_, res, next) => {
  try {
    const cache = getCache();
    const { path, browser, version } = Object.fromEntries(cache);
    console.info("Scanning file...");
    const file = readFileSync(path);
    const processingOptions: ProcessOptions = {
      from: undefined,
    };
    const scanned_result: ScannerResponseAsync["scanned_result"] = {
      [path]: [],
    };

    const plugins = [
      doiuse({
        browsers: [`${browser} ${version}`],
        ignore: ["rem"], // an optional array of features to ignore
        onFeatureUsage: function (usageInfo: any) {
          const message = parse_result(usageInfo.message);
          scanned_result[path].push(message);
        },
      }),
    ];
    if (path.endsWith(".less")) {
      processingOptions["syntax"] = syntax;
    }
    await postcss(plugins)
      .process(file.toString(), processingOptions)
      .catch((e) => {
        console.warn(
          "error occured while parsing =>",
          path,
          "=> this file will be discarded"
        );
      });
    res.send(scanned_result);
    res.end();
    next();
  } catch (e) {
    console.warn(e);
    next(e);
  }
};
