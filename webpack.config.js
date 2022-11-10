const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$|\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'styles/fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_URL: process.env.API_URL,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    modules: ['src', 'node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: path.resolve('/'),
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    port: 3030,
    host: '0.0.0.0',
  },
  devtool: 'inline-source-map',
};
