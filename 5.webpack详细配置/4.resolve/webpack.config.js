const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      // { template: './src/index.html' },
    ), // 默认创建一个白版模板html 打包引入所有资源
  ],
  // 解析模块的规则
  resolve: { // 路径别名 简写路径  路径没有提示
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensinos: ['.js', '.json'],
    modules: [// 告诉webpack解析模块去那个目录找
      resolve(__dirname, '../../node_modules'), 'node_modules',
    ],
  },
  mode: 'development',
};
