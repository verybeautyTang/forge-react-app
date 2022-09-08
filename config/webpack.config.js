
const { resolve } = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// ts、tsx、js、jsx
const tsRegTest = /\.(js|jsx|ts|tsx)$/

// 考虑less、module.less、css的情况所以要分开写
const cssRegTest = /\.css$/
const cssModuleRegTest = /\.module\.css$/
const lessRegTest = /\.less$/
const lessModuleRegTest = /\.module\.less$/

const cssModuleOptions = (type, useModules) => {
  const options = { importLoaders: type || 1 }
  if (useModules) {
    options.modules = {
      localIdentName: "[path][name]_[hash:base64:5]", // 允许配置生成的本地标识符(ident)。
      localIdentHashSalt: "hash", // 允许添加自定义哈希值以生成更多唯一类
      exportLocalsConvention: "camelCase", // 驼峰命名
    }
  }
  return options
}


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
        test: tsRegTest,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      },
      { // css
        test: cssRegTest,
        include: resolve(__dirname, "../src"),
        exclude: ["/node_modules/", cssModuleRegTest],
        use:[ 
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: cssModuleOptions(1, false),
            },
            "postcss-loader"
          ],
          sideEffects: true, // 优化，以跳过那些当导出不被使用且被标记不包含副作用的模块。
      }, 
      {
        test: cssModuleRegTest,
        include: resolve(__dirname, "../src"),
        exclude: "/node_modules/",
        use:[ 
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: cssModuleOptions(1, true),
            },
            "postcss-loader"
          ],
          sideEffects: true, 
      },
      {
        test: lessRegTest,
        include: resolve(__dirname, "../src"),
        exclude: ["/node_modules/", lessModuleRegTest],
        use:[ 
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: cssModuleOptions(1, false),
            },
            "postcss-loader",
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              }
            }
          ],
          sideEffects: true, 
      },
      {
        test: lessModuleRegTest,
        include: resolve(__dirname, "../src"),
        exclude: "/node_modules/",
        use:[ 
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: cssModuleOptions(1, true),
            },
            "postcss-loader",
            {
              loader: 'less-loader',
            }
          ],
          sideEffects: true, 
      },
      
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
    open: false,
    hot: true, // 控制模块热更
  }
}