const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

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
    filename: 'js/[name].[contenthash:10].js',
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
        use: [
          'thread-loader',
          {
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
        ],
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
  optimization: {
    splitChunks: {
      // chunks: 'initial',
      // initial //将入口文件相关的文件抽取打包出来（异步文件会单独打包）node_modules单独打包
      // async 只会将异步文件抽取打包出来 其他作为一个包（入口文件+node_modules）
      // all包含两者
      chunks: 'initial',
      minSize: 10,
      // maxSize: 5000,
      minChunks: 1,
      // maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // automaticNameDelimiter: '~',
      // automaticNameMaxLength: 30,
      // name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        ffffff: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // gzip 压缩
    port: 3000,
    open: true,
    hot: true,
  },
  devtool: 'cheap-module-source-map',
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
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker 快速启动
        2. 删除 serviceworker

        生成一个serviceworker 配置文件
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'development',
};
