import { NonStreamScannerRequest, ScannerResponse } from "@browser-scan/schema";
import doiuse from "doiuse";
import postcss, { ProcessOptions } from "postcss";
import { parse_result } from "./utils";
import syntax from "postcss-less";
import { readFileSync } from "fs";

export const scanFile = async ({
  params,
  done,
  error,
}: {
  params: NonStreamScannerRequest;
  done: (result: ScannerResponse) => void;
  error: (err: any) => void;
}) => {
  try {
    const { file, browser, version } = params;
    const processingOptions: ProcessOptions = {
      from: undefined,
    };
    const scanned_result: ScannerResponse["scanned_result"] = {
      [file]: [],
    };
    const fileContents = readFileSync(file);
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
    if (file.endsWith(".less")) {
      processingOptions["syntax"] = syntax;
    }
    await postcss(plugins)
      .process(fileContents.toString(), processingOptions)
      .catch((e) => {
        console.log(e);
        error(
          "error occured while parsing =>" +
            file +
            "=> this file will be discarded"
        );
      });
    done({
      scanned_result,
    });
  } catch (e) {
    error(e);
  }
};
