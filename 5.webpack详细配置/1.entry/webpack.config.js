const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  // entry: ['./src/index.js', './src/js/add.js'],
  entry: {
    index: './src/index.js',
    add: './src/js/add.js',
  },
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.less$/,
  //       use: ['style-loader', 'css-loader', 'less-loader'],
  //     },
  //   ],
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      // { template: './src/index.html' },
    ), // 默认创建一个白版模板html 打包引入所有资源
  ],
  mode: 'development',
};
