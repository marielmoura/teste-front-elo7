const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  const mode = argv.mode
  return{
    mode: mode,
    devtool: 'source-map',
    entry: {
      main: path.resolve(__dirname, './app.js'),
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'js/main.[contenthash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({ 
          patterns: [{
            from: path.resolve(__dirname, './src/img'),
            to: path.resolve(__dirname, './build/img')
          }]
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: mode==="development"?true:false, importLoaders: 1}},
            {loader: 'postcss-loader', options: {sourceMap: mode==="development"?true:false}},
            {loader: 'sass-loader', options: {sourceMap: mode==="development"?true:false}},
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'img'
  
          }
        },
  
      ]
    },
    devServer: {
      open: true
    }
  }
  
}