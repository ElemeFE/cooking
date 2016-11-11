const _set = require('lodash/set')
const _unset = require('lodash/unset')
const to2 = require('2webpack2')
const getBaseConfig = require('../util/get-base-config')
const merge = require('../util/merge')
const parse = require('../util/parse')
const loadExtend = require('../util/load-extend')
const isNextWebpack = require('../util/check').isNextWebpack

// cooking version
exports.version = require('../package.json').version

// webpack version
exports.webpackVersion = require('webpack/package.json').version

/**
 * loader.vue => module.loaders.vue
 */
const replacePath = function (_path) {
  if (/^((pre|post)?loader)s?/ig.test(_path)) {
    return _path.replace(/^((pre|post)?loader)s?/ig, 'module.$1s')
  }

  if (/^(plugin)s?/g.test(_path)) {
    return _path.replace(/^(plugin)s?/g, '$1s')
  }

  return _path
}

/**
 * set config
 */
exports.set = function (config) {
  config = config || {}
  this.config = merge(config, getBaseConfig(config))

  loadExtend(config.extends, {
    add: this.add,
    remove: this.remove,
    config: this.config,
    _userConfig: config
  })

  return this
}

/**
 * remove option
 * @param  {string} _path
 * @example
 * cooking.remove('loader.js')
 */
exports.remove = function (_path) {
  _unset(this.config, replacePath(_path))

  return this
}

/**
 * add a option config
 * @param {string} _path - path of config
 * @param {object} value - config
 * @example
 * cooking.add('loader.vue', {
 *   test: /\.vue$/,
 *   loaders: ['vue']
 * })
 */
exports.add = function (_path, value) {
  _set(this.config, replacePath(_path), value)

  return this
}

/**
 * return webpack config
 */
exports.resolve = function () {
  var v = exports.webpackVersion
  var needParse = false

  // webpack: 2
  if (isNextWebpack) {
    // <=2.1.0-beta.25
    if (/beta/.test(v) && v.split('.').pop() < 25) {
      needParse = false
    } else {
      needParse = true
    }
  }

  return needParse ? to2(parse(this.config), {quiet: true}) : parse(this.config)
}
