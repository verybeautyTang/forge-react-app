const { merge } = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const paths = require("./paths")
const common = require("./webpack.common.js")

const REACT_MODULE =
  /[\\/]node_modules[\\/](react|react-dom|react-redux|react-router-config|react-router-dom|react-router|redux|@reduxjs\/toolkit)[\\/]/
const ALI_MODULE = /[\\/]node_modules[\\/](antd|ahooks|@ant-design\/icons|moment)[\\/]/
const VENDOR_MODULE = /[\\/]node_modules[\\/](axios|localforage|query-string|classnames|@babel\/runtime)[\\/]/

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [paths.build, paths.build],
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      minChunks: 3,
      cacheGroups: {
        antd: {
          test: ALI_MODULE,
          name: "antd",
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: "all",
        },
        vendor: {
          test: VENDOR_MODULE,
          name: "vendor",
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: "all",
        },
        react: {
          test: REACT_MODULE,
          name: "react",
          minChunks: 1,
          priority: 10,
          enforce: true,
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
