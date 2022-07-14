const commonConfig = require("./common.config");

module.exports = function config({
  moduleInclude,
  outPutFile,
  outputPath,
  libraryName,
  externals,
  moduleExclude = [],
  entry,
  plugins = [],
}) {
  const common = commonConfig({
    moduleInclude,
    outPutFile,
    outputPath,
    libraryName,
    externals,
    moduleExclude,
    plugins,
  });
  return Object.assign(common, {
    entry,
    target: "node",
  });
};
