const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPath = path.resolve(__dirname, "..");

const getConfig = () => ({
  context: rootPath,
  entry: { main: path.resolve(rootPath, "src/index.tsx") },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(rootPath, "dist"),
    publicPath: "./",
  },
  optimization: {
    moduleIds: "deterministic",
    removeEmptyChunks: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks(chunk) {
            return chunk.name === "main";
          },
        },
      },
    },
    runtimeChunk: { name: "manifest" },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        rules: [
          {
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
      {
        test: /\.svg/,
        use: ["svg-url-loader"],
      },
      {
        test: /\.(jpg|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        rules: [{ use: ["file-loader"] }],
      },
      {
        test: /\.md$/,
        use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: path.resolve(rootPath, "dist/index.html"),
      template: path.resolve(rootPath, "index.html"),
    }),
    new CopyPlugin({
      patterns: ["public"],
    }),
    new webpack.DefinePlugin({
      __PUBLIC_URL__: `"${ process.env.PUBLIC_URL || ""}"`,
    }),
  ],
  performance: {
    hints: "warning",
    // Calculates sizes of gziped bundles.
    assetFilter(assetFilename) {
      return assetFilename.endsWith(".js.gz");
    },
  },
});

module.exports = getConfig;
