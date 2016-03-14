# cooking
提供基本 webpack 的配置和运行环境，立刻开始开发 vue, react 或 angular 的项目。

# Quick Start
Install cooking
```shell
npm i cooking -g
```

Create project
```shell
mkdir test-vue & cd test-vue
```

Run cooking
```shell
cooking init & cooking watch
```

Enjoy!

# Command
- init [name]

init project, defualt use **vue**, it will create `entry file` and `cooking.conf.js`.

- watch

watch mode, support hot reload, linting, css extraction.

- build

build mode, output assets to the `dist` directory.

# cooking.conf.js

```javacript
module.exports = function(webpack) {
  return {
    use: 'vue',
    port: '8080',
    openBrowser: false,

    // Configure your webpack.
  };
};
```

# Inspiration
[@egoist/tooling](https://github.com/egoist/tooling)

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
