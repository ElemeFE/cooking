var sh = require('shelljs')
var logger = require('./logger')

function CopyPlugin(from, to) {
  this.options = {from, to}
}

CopyPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', () => {
    const silentState = sh.config.silent // save old silent state

    console.log()
    sh.config.silent = true
    sh.cp('-R', this.options.from, this.options.to)
    if (sh.error()) {
      logger.fatal(sh.error())
    } else {
      logger.success('Copy static folders success: ' + this.options.from)
    }
    sh.config.silent = silentState
  })
}

module.exports = CopyPlugin
