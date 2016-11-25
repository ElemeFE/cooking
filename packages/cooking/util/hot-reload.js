'use strict'

const isString = require('./is').String
const logger = require('./logger')

module.exports = function (entry, devServer) {
  const result = {}

  if (!entry) {
    logger.fatal('Please set entry')
  }

  if (isString(entry)) {
    result.app = [].concat(entry)
  } else {
    Object.keys(entry || {}).forEach(name => {
      result[name] = [].concat(entry[name])
    })
  }

  if (devServer.enable) {
    const data = [
      `webpack-dev-server/client?${devServer.__host__}/`,
      'webpack/hot/dev-server'
    ]

    if (devServer.log) {
      data.push('webpack-hud')
    }

    Object.keys(result).forEach(name => {
      result[name] = data.concat(result[name])
    })
  }

  return result
}
