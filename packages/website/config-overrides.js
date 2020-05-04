const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// eslint-disable-next-line no-unused-vars
module.exports = function override(config, env) {
  if (!config.plugins) {
    // eslint-disable-next-line no-param-reassign
    config.plugins = [];
  }

  config.plugins.push(
    process.env.NODE_ENV === 'production'
      ? new CopyWebpackPlugin([{from: './src/assets/maps/mx.json', to: 'dist'}])
      : new CopyWebpackPlugin([{from: './src/assets/maps/mx.json'}]),
  );

  config.plugins.push(
    process.env.NODE_ENV === 'production'
      ? new CopyWebpackPlugin([
          {from: './src/assets/maps/covid.json', to: 'dist'},
        ])
      : new CopyWebpackPlugin([{from: './src/assets/maps/covid.json'}]),
  );

  if (process.env.NODE_ENV === 'development') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
