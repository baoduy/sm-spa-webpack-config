// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: ['./index.jsx'],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      name: true,
      // minSize: 307200, //300 kb
      // maxSize: 512000, //500 kb
      hidePathInfo: false,
      automaticNameDelimiter: '.',
      cacheGroups: {
        materialui: {
          test: /[\\/]@material-ui[\\/]/,
          name: 'material-ui',
          reuseExistingChunk: true,
          enforce: true,
          priority: 2
        },
        lodash: {
          test: /[\\/]lodash[\\/]/,
          name: 'lodash',
          reuseExistingChunk: true,
          enforce: true,
          priority: 2
        },
        moment: {
          test: /[\\/]moment[\\/]/,
          name: 'moment',
          reuseExistingChunk: true,
          enforce: true,
          priority: 1
        },
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          enforce: true,
          priority: 0
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: []
});
