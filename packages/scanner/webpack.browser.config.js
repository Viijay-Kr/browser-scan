const { commonConfig } = require("@browser-scan/bundler");
const path = require("path");

module.exports = commonConfig({
  moduleInclude: path.resolve(__dirname, "./"),
  libraryName: "@browser-scan/scanner",
  outPutFile: "index.js",
  outputPath: path.resolve(__dirname, "dist"),
  externals: [
    function ({ request }, callback) {
      if (/react\-query/.test(request)) {
        return callback(null, {
          root: "react-query",
          umd: request,
          commonjs: request,
          commonjs2: request,
        });
      }
      callback();
    },
  ],
  moduleExclude: [path.resolve(__dirname, "./api")],
});
