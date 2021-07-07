const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    en1: './src/index.js',
    en2: './src/index2.js',
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 300, // 30 * 1024, // 分割的chunks最小为30kb
      maxSize: 0, // 0 代表没有限制
      minChunks: 1, // 要提取 至少要别引用一次
      maxAsyncRequests: 5, // 按需加载时并行加载文件最大值
      // maxInitialRequests: 3, // 入口jis最大并行请求数量

      // name: true, // 可以使用命名规则
      automaticNameDelimiter: '~', // 命名规则 命名链接符
      cacheGroups: { // 命名规则 分割chunk的组
        // node_modules 文件会被到爆到vendores组的chuank中 -->vendors~~xx.js
        // 满足上面的公共柜子。如大小超过30kb
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 打包优先级
        },
        default: {
          minChunks: 2,
          priority: -20, // 打包优先级
          reuseExistingChunk: true, // 如果单签要打包的模块，和之前已经被提取的模块式同一个 就会被复用
        },
      },
    },
    runtimeChunk: { // 将当前模块的激励其他模块的的hash单独打包为一个文件 runtime
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      new TerserWebpackPlugin({
        cache: true, // 缓存
        parallel: true, // 多进程打包
        sourceMap: true, // 启动source-map
      }),
    ],
  },
  mode: 'development',
};
