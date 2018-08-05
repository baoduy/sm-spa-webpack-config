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
  plugins: [new BundleAnalyzerPlugin()]
});
