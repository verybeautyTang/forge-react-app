
const { resolve } = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

const isDev = process.env.NODE_ENV === "development"
module.exports ={
  entry: resolve(__dirname, "../src/Main.tsx"),
  mode: "development",
  devtool: "source-map",
  target: 'web',
  output: {
    publicPath: "/",
    path: resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [ // react
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      },
      { // 样式
        test: /\.less$/,
        use:[ 'style-loader',
      {
        loader: 'css-loader',

      }],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "react-demo",
      template: resolve(__dirname, "../public") + '/index.html' ,
      filename: "index.html", 
      inject: "body",
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    open: true,
    hot: true, // 控制模块热更
  }
}