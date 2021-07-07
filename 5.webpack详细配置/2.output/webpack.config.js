const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
    publicPath: '',
    chunkFilename: '[name]_chunk.js', // 非入口chunk
    library: '[name]', // 打包js 导出执行结果的变量名 用于引入文件后 可以通过该名称调用这个js  相当于 var [name]=(build.js执行结果)
    libraryTarget: 'window', // 变量名处于哪个作用域下 window/浏览器  global /node
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
