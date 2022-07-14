module.exports = function config({
  moduleInclude,
  outPutFile,
  outputPath,
  libraryName,
  externals,
  moduleExclude = [],
  ...rest
}) {
  return {
    mode: "production",
    entry: "./index.ts",
    output: {
      filename: outPutFile,
      path: outputPath,
      library: {
        name: libraryName,
        type: "umd",
      },
      globalObject: "this",
    },
    externals: [
      {
        react: {
          commonjs: "react",
          commonjs2: "react",
          amd: "react",
          root: "_",
        },
      },
      ...externals,
    ],
    module: {
      rules: [
        {
          test: /\.tsx?/,
          include: moduleInclude,
          exclude: [/node_modules/, /__tests__/, ...moduleExclude],
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
      ],
    },
    devtool: "source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    ...rest,
  };
};
