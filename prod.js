// production config
const merge = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: ['./index.jsx'],
  //devtool: "source-map", // source map for testing only so disable it in PRD
  output: {
    filename: 'bundle.min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  plugins: []
});
