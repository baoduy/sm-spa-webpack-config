// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./common');
const SizePlugin = require('size-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(commonConfig, {
  mode: process.env.NODE_ENV,
  entry: ['./index.jsx'],
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        //exclude: /(node_modules|bower_components|\.spec\.js)/,
        use: ['webpack-strip-block']
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      name: true,
      // minSize: 307200, //300 kb
      // maxSize: 512000, //500 kb
      hidePathInfo: false,
      automaticNameDelimiter: '-',
      cacheGroups: {
        css: {
          test: /\.(css|scss|less)$/i,
          name: 'style',
          reuseExistingChunk: true,
          enforce: true,
          priority: 101
        },
        moment: {
          test: /[\\/]moment[\\/]/,
          name: 'moment',
          reuseExistingChunk: true,
          //enforce: true,
          priority: 100
        },
        // materialUi: {
        //   test: /[\\/]@material-ui[\\/]/,
        //   name: 'material-ui',
        //   reuseExistingChunk: true,
        //   enforce: true,
        //   priority: 99
        // },
        react: {
          test: /[\\/](react|@material-ui)/,
          name: 'react',
          reuseExistingChunk: true,
          //enforce: true,
          priority: 98
        },
        // lodash: {
        //   test: /[\\/]lodash[\\/]/,
        //   name: 'lodash',
        //   reuseExistingChunk: true,
        //   enforce: true,
        //   priority: 97
        // },
        // vendors: {
        //   name: 'vendor',
        //   test: /[\\/]node_modules[\\/]/,
        //   reuseExistingChunk: true,
        //   enforce: true,
        //   priority: 1
        // },
        default: {
          name: 'manifest',
          minChunks: 1,
          reuseExistingChunk: true,
          //enforce: true,
          priority: 0
        }
      }
    }
  },
  plugins: [new SizePlugin()]
});
