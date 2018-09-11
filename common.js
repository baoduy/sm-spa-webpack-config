// shared config (dev and prod)
const { resolve } = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanCSSPlugin = require('less-plugin-clean-css');

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['file-loader?name=img/[name].[ext]', 'img-loader']
      },
      {
        test: /\.(svg)$/i,
        use: ['url-loader?mimetype=image/svg+xml', 'img-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?mimetype=application/octet-stream'
      },
      //copy Web config file to dist folder
      {
        test: /web.config/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      hot: devMode,
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html.ejs',
      favicon: 'favicon.ico'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ],
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react-dom/test-utils': true,
    'react-test-renderer/shallow': true
  },
  performance: {
    hints: 'warning'
  }
};
