<p align="center"><a href="http://elemefe.github.io/cooking/" target="_blank"><img src="https://cdn.rawgit.com/ElemeFE/cooking/gh-pages/static/logo.f3eae12.svg"></a></p>
<h3 align="center">cooking</h3>
<p align="center">
  更易上手的前端构建工具
</p>

<p align="center">
<a target="_blank" href="https://travis-ci.org/ElemeFE/cooking"><img src="https://travis-ci.org/ElemeFE/cooking.svg?branch=master" alt="Build Status"></a>
<a target="_blank" href='https://coveralls.io/github/ElemeFE/cooking?branch=master'><img src='https://coveralls.io/repos/github/ElemeFE/cooking/badge.svg?branch=master' alt='Coverage Status' /></a>
<a target="_blank" href="https://www.npmjs.com/package/cooking"><img src="https://img.shields.io/npm/dm/cooking.svg?maxAge=2592000" alt="npm"></a>
<a target="_blank" href="https://www.npmjs.com/package/cooking"><img src="https://img.shields.io/npm/v/cooking.svg?maxAge=6000" alt="npm"></a>
<a target="_blank" href="https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img src="https://img.shields.io/gitter/room/QingWei-Li/cooking.svg?maxAge=2592000" alt="Gitter"></a>
</p>

## 链接
- [文档](http://cookingjs.github.io)
- [例子](https://github.com/cooking-demo)
- [教程: 用 cooking 搭建一个简单又优雅的 Vue 项目开发环境 (入门篇)](https://zhuanlan.zhihu.com/p/22387692)
- [教程: 用 cooking 搭建一个多页面易配置的 Vue 2 项目（进阶篇）](https://zhuanlan.zhihu.com/p/22610408)

## 讨论
使用上遇到的问题请到 [Gitter 聊天室](https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link), issue 仅仅用来处理 bug 和 feature 等的问题。

## 特性
- 简化 webpack 的配置，更人性化的配置参数
- 安装命令行工具(cooking-cli)快速搭建项目且无需重复安装依赖，基于 webpack 2
- 兼容 webpack 1 和 2，只需同一套配置
- 生成的配置完全兼容 webpack 的命令行工具

## 安装

运行环境
- Node.js 4+
- npm 3+
- Python 2.7.x


### 使用 cooking 命令行工具
```shell
npm i cooking-cli -g
```

Step 1. 创建一个 vue 项目 （将自动下载 vue 项目脚手架，只需下载一次）
```shell
$ cooking create my-project vue
$ cd my-project
```

Step 2. 开始开发
```shell
$ cooking watch
```

### 只安装 cooking
```shell
npm i cooking -D

# 安装 webpack 的依赖（例如 webpack 1)
npm i babel-core babel-loader css-loader file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack@1 webpack-dev-server@1 extract-text-webpack-plugin@1 -D

# or install webpack dependencies (take webpack 2)
npm i babel-core babel-loader css-loader file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack webpack-dev-server extract-text-webpack-plugin -D

# 开始开发
node_modules/.bin/cooking watch # or webpack --config cooking.conf.js

# 如果全局安装了 cooking-cli 同样可以这样做(运行的依旧是本地项目的 cooking)
cooking watch
```

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
