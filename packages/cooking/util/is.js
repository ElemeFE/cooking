'use strict'

const toString = Object.prototype.toString

function type(obj) {
  return toString.call(obj)
}

exports.String = obj => type(obj) === '[object String]'
exports.Array = obj => type(obj) === '[object Array]'
exports.Object = obj => type(obj) === '[object Object]'
exports.Boolean = obj => type(obj) === '[object Boolean]'
exports.Function = obj => type(obj) === '[object Function]'
exports.nil = obj => obj === null || obj === undefined
