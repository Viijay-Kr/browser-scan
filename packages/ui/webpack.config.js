const path = require("path");
const { commonConfig } = require("@browser-scan/bundler");

module.exports = commonConfig({
  moduleInclude: path.resolve(__dirname),
  libraryName: "@browser-scan/ui",
  outputPath: path.resolve(__dirname, "dist"),
  outPutFile: "index.js",
  externals: [
    function ({ request }, callback) {
      if (/\@chakra\-ui/.test(request)) {
        return callback(null, {
          root: "chakra",
          umd: request,
          commonjs: request,
          commonjs2: request,
        });
      }
      if (/\@browser\-scan\/scanner/.test(request)) {
        return callback(null, {
          root: "scanner",
          umd: request,
          commonjs: request,
          commonjs2: request,
        });
      }
      if (/\@browser\-scan\/schema/.test(request)) {
        console.info(request);
        return callback(null, {
          root: "schema",
          umd: request,
          commonjs: request,
          commonjs2: request,
        });
      }
      callback();
    },
  ],
});
