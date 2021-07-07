const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        include: resolve(__dirname, 'src'), // 仅包含
        enforce: 'pre', // 执行顺序 提前
        // enforce: 'post',//执行顺序 延后
        loader: 'eslint-loader',
      },
      { // 在oneOf内的loader 只要触发一个成功 就会跳出
        oneOf: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      // { template: './src/index.html' },
    ), // 默认创建一个白版模板html 打包引入所有资源
  ],
  mode: 'development',
};
