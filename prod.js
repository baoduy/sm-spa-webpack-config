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
      name: false,
      minSize: 307200, //300 kb
      maxSize: 512000, //500 kb
      hidePathInfo: true,
      automaticNameDelimiter: '.',
      cacheGroups: {
        lodash: {
          test: /[\\/]lodash[\\/]/,
          name: 'lodash',
          reuseExistingChunk: true
        },
        moment: {
          test: /[\\/]moment[\\/]/,
          name: 'moment'
        },
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: []
});
