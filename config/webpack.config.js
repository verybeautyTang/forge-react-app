
const { resolve } = require("path")
const isDev = process.env.NODE_ENV === "development"
module.exports ={
  entry: resolve(__dirname, "../src/Main.tsx"),
  mode: "development",
  target: 'web',
  output: {
    path: resolve(__dirname, "../dist"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    // alias: {
    //   '@': resolve(__dirname, '../src')
    // }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000
  }
}