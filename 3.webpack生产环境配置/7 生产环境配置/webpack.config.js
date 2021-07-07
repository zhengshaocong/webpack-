const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('process-preset-env')(),//eslint-disable-line
      ],
    },
  },
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        text: '/.css$/',
        use: [
          ...commonCssLoader,
        ],
      },
      {
        text: '/.less$/',
        use: [
          ...commonCssLoader,
          'less-loader',
        ],
      },
      {
        text: '/.js$/',
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        text: '/.js$/',
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          preset: [
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
        },
      },
      {
        test: /\.(js|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false,
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
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
  mode: 'production',
};
