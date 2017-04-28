'use strict'
const cp=require('child_process')
module.exports = name => {
  try {
    cp.execSync("node -e require.resolve('" + name + "')", { stdio: 'ignore' });

    return true
  } catch (_) {
    return false
  }
}
