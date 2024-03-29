

const { resolve } = require("path");

// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// ts、tsx、js、jsx
const tsRegTest = /\.(js|jsx|ts|tsx)$/;

// 考虑less、module.less、css的情况所以要分开写
const cssRegTest = /\.css$/;
const cssModuleRegTest = /\.module\.css$/;
const lessRegTest = /\.less$/;
const lessModuleRegTest = /\.module\.less$/;

// const cssModuleOptions = (type, useModules) => {
// 	const options = { importLoaders: type || 1 };
// 	if (useModules) {
// 		options.modules = {
// 			localIdentName: "[path][name]_[hash:base64:5]", // 允许配置生成的本地标识符(ident)。
// 			localIdentHashSalt: "hash", // 允许添加自定义哈希值以生成更多唯一类
// 			exportLocalsConvention: "camelCase", // 驼峰命名
// 		};
// 	}
// 	return options;
// };
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

const paths = require("./paths")
const CssPlugin = require("./plugins/CssPlugin")

// const isDev = process.env.NODE_ENV === "development"
const analyse = process.env.analyse === "1"

const jstsRegex = /\.(js|jsx|ts|tsx)$/
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

const cssModuleOptions = (type, useModules) => {
  const options = { importLoaders: type || 1 }
  if (useModules) {
    options.modules = {
      localIdentName: "[path][name]_[hash:base64:5]",
      // localIdentContext: paths.src,
      exportLocalsConvention: "camelCase",
    }
  }
  return options
}

const lessOptions = () => {
  const lessOptions = {
    // modifyVars: antdTheme,
    javascriptEnabled: true,
  }
  return {
    lessOptions,
  }
}


const isDev = process.env.NODE_ENV === "development";
module.exports ={
	entry: resolve(__dirname, "../src/Main.tsx"),
	mode: "development",
	devtool: "source-map",
	target: "web",
	output: {
		publicPath: "/",
		path: resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
		alias: {
			"@": resolve(__dirname, "../src")
		}
	},
	module: {
		rules: [ // react
			{
				test: tsRegTest,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				}
			},
			{ // css
				test: cssRegTest,
				include: resolve(__dirname, "../src"),
				exclude: ["/node_modules/", cssModuleRegTest],
				use:[ 
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
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
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
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
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: cssModuleOptions(1, false),
					},
					"postcss-loader",
					{
						loader: "less-loader",
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
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: cssModuleOptions(1, true),
					},
					"postcss-loader",
					{
						loader: "less-loader",
					}
				],
				sideEffects: true, 
			},
      
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "react-demo",
			template: resolve(__dirname, "../public") + "/index.html" ,
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
};
const config = {
  cache: {
    type: "filesystem",
  },
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  entry: {
    app: `${paths.src}/Main.tsx`,
  },
  output: {
    path: paths.build,
    pathinfo: false, // 删除路径信息加速打包
    publicPath: isDev ? "/" : "./",
    filename: isDev ? "js/[name].js" : "js/[name].[contenthash].js",
    chunkFilename: isDev ? "js/[name].js" : "js/[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": paths.src,
    },
  },
  module: {
    rules: [
      {
        test: jstsRegex,
        exclude: "/node_modules/",
        include: paths.src,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [isDev && require.resolve("react-refresh/babel")].filter(Boolean),
            },
          },
        ],
      },
      {
        test: cssRegex,
        include: paths.src,
        exclude: [cssModuleRegex, "/node_modules/"],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: cssModuleOptions(1, false),
          },
          "postcss-loader",
        ],
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        include: paths.src,
        exclude: "/node_modules/",
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: cssModuleOptions(1, true),
          },
          "postcss-loader",
        ],
        sideEffects: true,
      },
      {
        test: lessRegex,
        include: paths.src,
        exclude: [lessModuleRegex],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: cssModuleOptions(1, false),
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: lessOptions(),
          },
        ],
        sideEffects: true,
      },
      {
        test: lessModuleRegex,
        include: paths.src,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: cssModuleOptions(1, true) },
          "postcss-loader",
          { loader: "less-loader" },
        ],
        sideEffects: true,
      },
    ].filter(Boolean),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "1111",
      template: `${paths.public}/index.html`, // template file
      favicon: `${paths.public}/favicon.ico`,
      filename: "index.html", // output file
      inject: "body", // script插入body底部
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "styles/[id].[contenthash].css",
      attributes: {
        crossorigin: "anonymous",
      },
    }),
    isDev && new ReactRefreshWebpackPlugin({ overlay: false }),
    analyse && new BundleAnalyzerPlugin(),
    new ProgressBarPlugin(),
    new CssPlugin(),
  ].filter(Boolean),
}

module.exports = config
