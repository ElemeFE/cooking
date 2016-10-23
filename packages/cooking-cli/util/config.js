'use strict'

const path = require('path')
const fs = require('fs')
const PLUGIN_PATH = require('./path').PLUGIN_PATH

const filename = 'config.json'
const filePath = path.join(PLUGIN_PATH, filename)
const defaultConfig = {
  template: 'vue',
  pm: 'npm',
  registry: '',
  updateCheck: true,
  github: '',
  author: ''
}

const formatBoolean = value => {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  }

  return value
}
const requireFile = () => {
  return require(filePath)
}

exports.init = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2))
  }
}

exports.get = option => {
  if (!option) {
    return requireFile()
  }

  return requireFile()[option]
}

exports.set = (option, value) => {
  const config = requireFile()

  if (defaultConfig.hasOwnProperty(option)) {
    config[option] = formatBoolean(value)
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2))

    return true
  }

  return false
}
