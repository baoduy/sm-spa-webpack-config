// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./common');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    runtimeChunk: false,
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      name: true,
      // minSize: 307200, //300 kb
      // maxSize: 512000, //500 kb
      hidePathInfo: false,
      automaticNameDelimiter: '-',
      cacheGroups: {
        style: {
          test: /\.(css|sass|scss|less)$/,
          name: 'style',
          chunks: 'async',
          enforce: true,
          reuseExistingChunk: true,
          priority: 100
        },
        materialUi: {
          test: /[\\/]@material-ui[\\/]/,
          name: 'material-ui',
          reuseExistingChunk: true,
          enforce: true,
          priority: 99
        },
        react: {
          test: /[\\/]react/,
          name: 'react',
          reuseExistingChunk: true,
          enforce: true,
          priority: 98
        },
        lodash: {
          test: /[\\/]lodash[\\/]/,
          name: 'lodash',
          reuseExistingChunk: true,
          enforce: true,
          priority: 3
        },
        moment: {
          test: /[\\/]moment[\\/]/,
          name: 'moment',
          reuseExistingChunk: true,
          enforce: true,
          priority: 2
        },
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          enforce: true,
          priority: 0
        },
        default: false
      }
    }
  }
});
