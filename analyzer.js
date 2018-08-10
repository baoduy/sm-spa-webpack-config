// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  output: {
    filename: 'bundle.min.js',
    chunkFilename: '[name].js',
    path: resolve(__dirname, '../../analysis'),
    publicPath: '/'
  },
  plugins: [new BundleAnalyzerPlugin()]
});
