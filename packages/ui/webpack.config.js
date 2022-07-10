const path = require("path");

module.exports = {
  mode: "production",
  entry: "./index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      name: "@browser-scan/ui",
      type: "umd",
    },
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
    function ({ context, request }, callback) {
      if (/\@chakra\-ui/.test(request)) {
        return callback(null, {
          root: "chakra",
          umd: request,
          commonjs: request,
          commonjs2: request,
        });
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.tsx?/,
        include: path.resolve(__dirname, "components"),
        exclude: /node_modules/,
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
};
