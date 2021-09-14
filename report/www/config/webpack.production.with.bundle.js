const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const defaultConfig = require("./webpack.production.js");

module.exports = (apiUrl) => {
  const config = defaultConfig(apiUrl);
  return {
    ...config,
    plugins: config.plugins.concat([new BundleAnalyzerPlugin()]),
  };
};
