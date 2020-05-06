const CopyWebpackPlugin = require('copy-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  webpack(config, env) {
    if (!config.plugins) {
      // eslint-disable-next-line no-param-reassign
      config.plugins = [];
    }

    config.module.rules.push({
      test: /\.worker\.js$/,
      use: {loader: 'worker-loader'},
    });

    config.plugins.push(
      process.env.NODE_ENV === 'production'
        ? new CopyWebpackPlugin([
            {from: './src/assets/maps/mx.json', to: 'dist'},
          ])
        : new CopyWebpackPlugin([{from: './src/assets/maps/mx.json'}]),
    );

    config.plugins.push(
      process.env.NODE_ENV === 'production'
        ? new CopyWebpackPlugin([
            {from: './src/assets/maps/covid-counters.json', to: 'dist'},
          ])
        : new CopyWebpackPlugin([
            {from: './src/assets/maps/covid-counters.json'},
          ]),
    );

    if (process.env.NODE_ENV === 'development') {
      config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
  },
};
