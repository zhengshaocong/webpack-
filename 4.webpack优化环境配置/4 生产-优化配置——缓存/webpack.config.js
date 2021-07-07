const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/*
缓存
  babel缓存
  在babel配置options里添加属性 cacheDirctory ：true
  只会修改改变的文件，不变的文件会读取缓存 打包速度更快
  文件缓存
    hash：每次webpack构建时会生成一个唯一hash值
    问题：js和css使用同一个hash值 若重新打包 会导致相应hash值的文件缓存失效

    chuankhash 根据chunk生成的hash，只有在相同chunk的情况下hash就相同
    但这大多数情况下，就只有一个chunk

    contenthahs 根据内容生成hash值

*/
const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
    },
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-preset-env')(),//eslint-disable-line
      ],
    },
  },
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ...commonCssLoader,
        ],
      },
      {
        test: /\.less$/,
        use: [
          ...commonCssLoader,
          'less-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { // core-js 版本
                  version: 3,
                },
                targets: { // 兼容版本
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                },
              },
            ],
          ],
          cacheDirectory: true, // babel 缓存
        },
      },
      {
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[contenthash:10].[ext]',
          outputPath: 'imgs',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // gzip 压缩
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'cheap-module-source-map', // 提供 开发时报错 将打包后的报错位置映射到源代码 方便查询
  //  inline-source-map 内联 文件变大 集中在built.js
  // hidden-soure-map 能提示错误 不能追踪
  // eavl-source-map 内联 分散到各个文件
  // nosoureces-source-map 能提示 没有任何源代码信息
  // cheap-source-map 外部 错误最终精度低 追踪到某行一整行
  // cheap-module-source-map 外部 错误最终精度低 追踪到某行一整行 引入loader的错误信息
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  mode: 'development',
};
