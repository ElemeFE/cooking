# cooking
[![npm](https://img.shields.io/npm/dm/cooking.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/v/cooking.svg?maxAge=6000)](https://www.npmjs.com/package/cooking)
[![gitter](https://img.shields.io/gitter/room/QingWei-Li/cooking.svg?maxAge=2592000)](https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> 更易上手的前端构建工具，基于 webpack


## Links
- [Docs](http://cookingjs.github.io)
- [Examples](https://github.com/cooking-demo)
- [Plugins](https://github.com/cookingjs)

## Installation
```shell
npm i cooking -D
```

### webpack 1
```shell
npm i babel-core babel-loader css-loader file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack@1 webpack-dev-server@1 extract-text-webpack-plugin@1 -D
```

### webpack 2
```shell
npm i babel-core babel-loader css-loader file-loader postcss postcss-loader\
 html-loader html-webpack-plugin json-loader style-loader url-loader\
 webpack@beta webpack-dev-server@beta extract-text-webpack-plugin@beta -D
```

## Usage

cooking.conf.js
```javascript
var cooking = require('cooking')

cooking.set({
  entry: './src/index.js',
  dist: './dist',
  template: './index.tpl',
  hash: true,
  extractCSS: true,
  devServer: { port: 8080 }
})

module.exports = cooking.resolve()
```

```shell
# development
node_modules/.bin/cooking watch

# production
node_modules/.bin/cooking build -p

# or use webpack
NODE_ENV=production webpack --config cooking.conf.js
```

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
