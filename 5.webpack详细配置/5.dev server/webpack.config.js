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
    extensions: ['.js', '.json'],
    modules: [// 告诉webpack解析模块去那个目录找
      resolve(__dirname, '../../node_modules'), 'node_modules',
    ],
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'), // 运行目录
    compress: true, // gzip压缩
    port: 5000, // 端口号
    host: 'localhost', // 域名
    open: true, // 打开浏览器
    hot: true, // 开HMR

    watchContentBase: true, // 监视目录下所有文件 一旦文件变化就reload
    watchOption: {
      ignored: /node_modules/, // 忽略文件
    },
    clientLogLevel: 'none', // 不要显示启动服务器的日志信息
    quiet: true, // 除了一些基本信息以为 其他内容不显示
    overlay: false, // 若出错 不要全屏提示
    proxy: { // 服务器代理
      '/api': {
        target: 'http://localhot:3000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  mode: 'development',
};
