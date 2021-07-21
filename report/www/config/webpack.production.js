const webpack = require('webpack');

const defaultConfig = require('./webpack.base');

const baseConfig = defaultConfig();

module.exports = (apiUrl) => ({
  ...baseConfig,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.cssmodule\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64]',
              },
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
    ].concat(baseConfig.module.rules),
  },
  plugins: baseConfig.plugins.concat([
    new webpack.DefinePlugin({
      __PUBLIC_URL__: "'http://localhost:3000'",
    }),
  ]),
});
