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