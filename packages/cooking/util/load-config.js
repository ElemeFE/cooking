'use strict'

const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const logger = require('./logger')

/**
 * 装配配置文件
 * @param  {string} filename   文件名
 * @return {object}            配置内容
 */
module.exports = function (filename, program) {
  const configPath = path.join(process.cwd(), filename)
  let config

  // load config
  try {
    config = require(configPath)
  } catch (e) {
    logger.error('Failed to read the config.')
    logger.fatal(e.stack)
  }

  config.name = filename

  // register progressbar
  if (program.progress) {
    [].concat(config).forEach(function (c) {
      c.plugins.push(new ProgressBarPlugin())
    })
  }

  return config
}
