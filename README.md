# 1 本项目：
## docs

```bash

# 运行(先全局安装 npm i docsify-cli -g)（目前npm找不到这个包了，实测cnpm可以）
docsify serve ./docs

# 打包(需要安装node_modules)
npm run build:lib 

```
## 在线项目预览：

https://lqr5678.github.io/myUI/



# 2 教程：
docsify 官网：https://docsify.js.org/#/zh-cn/

参考：@guoqzuo/vue-chart（http://vuechart.zuo11.com/#/）（已停止维护）


基于 Vue 2.x 组件库，用于测试怎么写一个 Vue 组件库，并为该组件库做一个类似 ElemnetUI 官网的文档。


```bash
# 全局安装 docsify-cli（目前npm找不到这个包了，实测cnpm可以）
npm i docsify-cli -g
# 创建一个新的项目docs
docsify init ./docs  
# 默认会把当前目录的 README.md copy到docs目录，作为主页
# Initialization succeeded! Please run docsify serve ./docs
# 运行
docsify serve ./docs
# Serving /Users/guoqzuo/Desktop/gitclone/vue-chart/docs now.
# Listening at http://localhost:3000

# 打包
npm run build:lib 
# 将打包好的lib文件内容拷贝到docs下
```

## examples处理

```bash
# 创建examples vue标准项目
vue create vue-chart-examples
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, CSS Pre-processors, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Less
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In package.json
? Save this as a preset for future projects? (y/N) n
```


## 目录结构

```bash
docs # 文档目录
examples # vue测试demo
lib # umd构建生成目录
packages # UI组件源码目录
src # 主入口目录 src/index.js 
staticDemo # 静态页面引入测试demo
publish.sh # npm包上传脚本
vue.config.js # vue-cli-service打包配置
# test # TODO 单元测试目录
# types # TODO ts支持目录

```
