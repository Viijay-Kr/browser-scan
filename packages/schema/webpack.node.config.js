const { nodeConfig } = require("@browser-scan/bundler");
const path = require("path");

module.exports = nodeConfig({
  moduleInclude: path.resolve(__dirname),
  moduleExclude: [],
  entry: path.resolve(__dirname, "index.ts"),
  outPutFile: "index.js",
  outputPath: path.resolve(__dirname, "dist"),
  externals: [],
});
