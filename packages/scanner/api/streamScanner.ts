import { join } from "path";
import { readFile, promises as fsp } from "fs";
import { ScannerResponse, StreamScannerRequest } from "@browser-scan/schema";
import doiuse from "doiuse";
import { parse_result } from "./utils";
import postcss, { ProcessOptions } from "postcss";
import syntax from "postcss-less";

const getFilesRecursively = async (
  dir: string,
  scanning_promises: Array<Promise<string>>,
  resolveFile: (file: string) => Promise<string>
) => {
  let files = await fsp.readdir(dir, { withFileTypes: true });
  for (const f of files) {
    const full_path = join(dir, f.name);
    if (!f.name.match(/node_modules/) && !f.name.match(/git/)) {
      if (f.isDirectory()) {
        await getFilesRecursively(full_path, scanning_promises, resolveFile);
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

export const scanFilesInChunks = async ({
  params,
  stream,
  done,
  error,
}: {
  params: StreamScannerRequest;
  /** A Callback to process the chunks */
  stream: (chunk: ScannerResponse) => void;
  /** A Callback to indicate the scanning is complete */
  done: (result: ScannerResponse) => void;
  /** Callback triggering an error in processing */
  error: (error: any) => void;
}) => {
  try {
    const scanned_result: ScannerResponse["scanned_result"] = {};
    const { browser, version, path } = params;
    console.info("Scanning files...");
    const resolveFile = (file: string): Promise<string> => {
      return new Promise((resolve) => {
        if (!scanned_result[file]) {
          scanned_result[file] = [];
        }
        const plugins = [
          doiuse({
            browsers: [`${browser} ${version}`],
            ignore: ["rem"],
            onFeatureUsage: function (usageInfo: any) {
              const message = parse_result(usageInfo.message);
              scanned_result[file].push(message);
            },
          }),
        ];
        readFile(file, (err, content) => {
          if (err) {
            error(err);
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
              error(
                "error occured while parsing =>" +
                file +
                "=> this file will be discarded"
              );
              resolve(file);
            })
            .then(() => {
              stream({
                scanned_result,
              });
              resolve(file);
            });
        });
      });
    };
    const scanning_promises = await getFilesRecursively(path, [], resolveFile);
    await Promise.all(scanning_promises);
    console.info("Scanning Complete");
    done({
      scanned_result,
    });
  } catch (e) {
    error(e);
  }
};
