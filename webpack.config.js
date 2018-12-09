const {WebPlugin} = require('web-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    index: './test.js'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: []
      // }
    ]
  },
  plugins: [
    new WebPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/dist/'
  },
  devServer: {
    hot: true,
    port: 4001,
    index: './dist/index.html'
  }
}
