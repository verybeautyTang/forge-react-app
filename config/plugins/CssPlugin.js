const HtmlWebpackPlugin = require("html-webpack-plugin")

class CssPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("CssPlugin", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync("CssPlugin", (data, cb) => {
        data.assetTags.styles = data.assetTags.styles.map(s => {
          s.attributes.crossorigin = "anonymous"
          return s
        })
        cb(null, data)
      })
    })
  }
}

module.exports = CssPlugin
