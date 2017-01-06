'use strict'

const _toArray = require('lodash/toArray')
const shelljs = require('shelljs')
const CopyPlugin = require('./copy-plugin')

module.exports = function (config) {
  // parse loader
  [
    'loaders',
    'preLoaders',
    'postLoaders'
  ].forEach(key => {
    config.module[key] = _toArray(config.module[key])
  })
  // parse plugin
  config.plugins = _toArray(config.plugins)

  // install resolve path
  require('./load-resolve-path')(config)

  if (process.env.NODE_ENV === 'development') {
    // install dev server
    config.devServer = require('../util/load-server')(config.devServer)

    // update path
    config.output.publicPath = config.devServer.publicPath || config.output.publicPath || '/'
  }

  // load hot loader
  config.entry = require('./hot-reload')(
    config.entry,
    process.env.NODE_ENV === 'development' ? config.devServer : false
  )

  if (config.__COOKING_CLEAN__) {
    shelljs.rm('-rf', config.output.path)
    delete config.__COOKING_CLEAN__
  }

  if (process.env.NODE_ENV === 'production' && config.__COOKING_STATIC__) {
    const $static = config.__COOKING_STATIC__
    config.plugins.push(new CopyPlugin($static === true ? 'static' : $static, config.output.path))
    delete config.__COOKING_STATIC__
  }

  return config
}
