// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: ['./index.jsx'],
  output: {
    filename: 'bundle.min.js',
    chunkFilename: '[name].js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          reuseExistingChunk: true,
          minChunks: 2
        }
      }
    }
  },
  plugins: []
});
