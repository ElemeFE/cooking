'use strict'

const isObject = require('./is').Object
const defaultServer = {
  port: 8080,
  hot: true,
  log: true,
  enable: true,
  historyApiFallback: true,
  lazy: false,
  stats: 'errors-only',
  host: 'localhost'
}

module.exports = server => {
  // null, undefined, false
  if (!server || server === false) {
    return {
      enable: false,
      stats: 'errors-only'
    }
  }

  // object
  if (isObject(server)) {
    const config = Object.assign(defaultServer, server)

    config.host = config.hostname || server.host
    delete config.hostname
    config.__host__ = `${config.https ? 'https' : 'http'}://${config.host}:${config.port}`

    return config
  }

  // array, string, true, number .etc
  return defaultServer
}
