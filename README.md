# forge-react-app
手搭一个react-app，伪造cra
# 第一步：
pnpm init 构建package.json

# 第二步：
构建typescript
1、安装ts ，pnpm add typescript
2、执行命令tsc --init, 生成tsconfig.json
3、根据自己的环境配置tsconfig配置
4、

# 第三步：
添加ignore文件，每次提交的代码的时候，有一些文件不要提交上去
node_module -> 因为lock里面已经存在了锁版文件，可以直接通过pnpm install 进行下载安装，而且node_modules文件又很大，上传耗时很长
dist -> 打包的文件也没有必要传递上去
pnpm-error.log -> 安装错误日志
.yalc -> 模拟发包
yalc.lock -> 模拟发包的锁版文件

# 第四步：
安装react以及react相关的组件并且搭建项目框架

项目框架目录
build webpack配置
  -- xxx.dev.js
  -- xxx.prod.js
  -- xxx.common.js
config
public
 -- 我还没想好要放什么
src
  --Main.tsx  render页面文件
  --App.tsx  入口文件
  -- components
  -- pages 页面级别
      --index.tsx
      -- index.module.less
      --components 页面级别组件
        --xxx.tsx
        --xxx.module.lss
  -- utils 工具函数
      --xxx.ts
  -- styles 全局样式/iconfont样式/颜色变量
    --xxx.less
  -- store 初始化redux配置
    ---xxx.ts
  -- layout 页面布局
    -- LoginLayout 登录布局
      -- xxx.tsx
      -- xxx.less
    -- 404Layout 404布局
      -- xxx.tsx
      -- xxx.less
    -- NormalLayout 正常布局
      -- xxx.tsx
      -- xxx.less
  -- hooks 
      --usexxx.tsx
  -- constants 静态变量
      xxx.ts
  -- assets 静态资源存放地方
    --iconfont 图标
      -- xxx.woff
    --img  图片
      -- xxx.png
  -- api 请求封装
    -- xxx.ts
  -- router 路由封装、拦截等
      -- xxx.tsx
      -- xx.ts
  -- types 页面的类型声明文件
      -- xxx.ts

安装react以及相关的包
react
react-dom
recat-router
react-redux
react-router-dom
react-router-config

第五步： 配置webpack
在配置Webpack的时候会遇到很多坑。一开始不要想着直接把开发环境、和生产环境完全分开。可以一步一步来
 .下载webpack相关的包：
      "typescript": "^4.7.4",
      "webpack": "^5.74.0",
      "webpack-cli": "^4.10.0",
      "webpack-dev-server": "^4.10.0"
 .下载babel相关配置的包
    因为打包本来就是webpack与babel进行配合（babel解析es6语法为es5，以及解析tsx语法等）
  需下载的相关的包有：
      "@babel/core": "^7.18.10",
      "@babel/plugin-transform-runtime": "^7.18.10",
      "@babel/plugin-transform-typescript": "^7.18.12",
      "@babel/preset-env": "^7.18.10",
      "@babel/preset-react": "^7.18.6",
      "@babel/preset-typescript": "^7.18.6",
  .配置babel --> 官网如下：https://www.babeljs.cn/
  .配置.babelrc.json
  
  .配置webpack文件
    1、先让页面正常运转起来
    2、引入less
    3、页面热更新【webpack5内嵌了模块的热更新】
    4、git提交规范
      ** 安装commitizen
    5、husky、pritter规范
      ** 下载eslint prettier eslint-config-prettier
      ** 命令行里面输入 pnpm create @eslint/config 配置eslint
      ** 根目录添加.prettierrc.ts文件
      ** 根目录添加.prettierignore.ts文件
    6、添加插件、loader 
      ** MiniCssExtractPlugin : https://webpack.docschina.org/plugins/mini-css-extract-plugin/
      ** 
    

    

 