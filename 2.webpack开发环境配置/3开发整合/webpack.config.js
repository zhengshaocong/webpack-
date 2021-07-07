const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            esModule: false,
            // name: '[name].[ext]',
          },
        }],
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader',
        // use:[
        //     {loader:'html-loader'}
        // ]
      },
      {
        exclude: /\.(less|css|js|html|png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }), // 默认创建一个白版模板html 打包引入所有资源
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true, // gzip 压缩
    port: 3000,
    open: true,
  },
  mode: 'development',
};
