'use strict'

const isArray = require('./is').Array

module.exports = function (plugins) {
  return isArray(plugins) ?
    () => plugins :
    () => plugins.apply(this, arguments)
}
