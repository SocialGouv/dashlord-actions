const webpack = require("webpack");
const path = require("path");

const defaultConfig = require("./webpack.base");

const baseConfig = defaultConfig();

module.exports = {
  ...baseConfig,
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: [
      "webpack-dev-server/client?http://localhost:3000/",
      "./src/index.tsx",
    ],
  },
  devServer: {
    contentBase: path.resolve(baseConfig.context, "dist"),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    port: 3000,
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(baseConfig.context, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.cssmodule\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]",
              },
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
    ].concat(baseConfig.module.rules),
  },
  plugins: baseConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]),
  performance: {
    hints: false,
  },
};