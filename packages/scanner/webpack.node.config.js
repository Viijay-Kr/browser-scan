const { nodeConfig } = require("@browser-scan/bundler");
const path = require("path");
const CopyPlygin = require("copy-webpack-plugin");

module.exports = nodeConfig({
  entry: "./api/index.ts",
  moduleInclude: path.resolve(__dirname, "./api"),
  outputPath: path.resolve(__dirname, "dist/api"),
  outPutFile: "index.js",
  libraryName: "@browser-scan/scanner",
  externals: [
    function ({ request }, callback) {
      if (/doiuse|postcss/.test(request)) {
        return callback(null, {
          root: request,
          umd: request,
          commonjs: request,
          commonjs2: request,
        });
      }
      return callback();
    },
  ],
  plugins: [
    new CopyPlygin({
      patterns: ["doiuse.d.ts"],
    }),
  ],
});
