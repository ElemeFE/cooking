<p align="center"><a href="http://elemefe.github.io/cooking/" target="_blank"><img src="https://cloud.githubusercontent.com/assets/7565692/19318700/4f595bec-90dc-11e6-9911-c9ca322e5bf8.png"></a></p>
<h3 align="center">cooking</h3>
<p align="center">
  A front-end build tool that comes handy
</p>

<p align="center">
<a target="_blank" href="https://travis-ci.org/ElemeFE/cooking"><img src="https://travis-ci.org/ElemeFE/cooking.svg?branch=master" alt="Build Status"></a>
<a target="_blank" href='https://coveralls.io/github/ElemeFE/cooking?branch=master'><img src='https://coveralls.io/repos/github/ElemeFE/cooking/badge.svg?branch=master' alt='Coverage Status' /></a>
<a target="_blank" href="https://www.npmjs.com/package/cooking"><img src="https://img.shields.io/npm/dm/cooking.svg?maxAge=2592000" alt="npm"></a>
<a target="_blank" href="https://www.npmjs.com/package/cooking"><img src="https://img.shields.io/npm/v/cooking.svg?maxAge=6000" alt="npm"></a>
<a target="_blank" href="https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img src="https://img.shields.io/gitter/room/QingWei-Li/cooking.svg?maxAge=2592000" alt="Gitter"></a>
</p>

## Links
- [中文版 README](https://github.com/ElemeFE/cooking/blob/master/README_zh-cn.md)
- [Documentation](http://cookingjs.github.io)
- [Demo](https://github.com/cooking-demo)
- [教程: 用 cooking 搭建一个简单又优雅的 Vue 项目开发环境 (入门篇)](https://zhuanlan.zhihu.com/p/22387692)
- [教程: 用 cooking 搭建一个多页面易配置的 Vue 2 项目（进阶篇）](https://zhuanlan.zhihu.com/p/22610408)

## Discussion
Hit [Gitter](https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link) if you come across any problem while using cooking. Issues are only for bug reports and feature requests.

## Features
- Simplified webpack configuring with humanistic parameters
- Use cooking CLI to efficiently scaffold projects without installing dependencies repeatedly (based on webpack 2)
- Compatible with both webpack 1 and 2 with just one set of configuration
- Generated configuration fully compatible with webpack CLI

## Installation

runtime environment
- Node.js 4+
- npm 3+
- Python 2.7.x


### Using cooking CLI
```shell
npm i cooking-cli -g
```

Step 1. create a vue-based project (vue scaffold will be downloaded automatically if not installed)
```shell
$ cooking create my-project vue
$ cd my-project
```

Step 2. start developing
```shell
$ cooking watch
```

### Using cooking core
```shell
npm i cooking -D

# install webpack dependencies (take webpack 1 for example)
npm i babel-core babel-loader css-loader file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack@1 webpack-dev-server@1 extract-text-webpack-plugin@1 -D

# or install webpack dependencies (take webpack 2)
npm i babel-core babel-loader css-loader file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack webpack-dev-server extract-text-webpack-plugin -D

# start developing
node_modules/.bin/cooking watch # or webpack --config cooking.conf.js

# if cooking-cli is globally installed, you can also do this (it still runs your local cooking)
cooking watch
```

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
