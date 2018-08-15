// production config
const merge = require('webpack-merge');
const { resolve } = require('path');
const commonConfig = require('./prod');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = merge(commonConfig, {
  output: {
    path: resolve(__dirname, '../../analysis')
  },
  plugins: [new BundleAnalyzerPlugin()]
});
