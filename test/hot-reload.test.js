import test from 'ava'
import hotReload from '../packages/cooking/util/hot-reload'
import loadServer from '../packages/cooking/util/load-server'

test('load hotreload', t => {
  const entry = 'entry.js'
  const devServer = {
    host: 'http://localhost:8080',
    enable: true
  }
  const config = hotReload(entry, loadServer(devServer))

  t.deepEqual(config, {
    app: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      'entry.js'
    ]
  })
})

test('multiple enty', t => {
  const entry = {
    pageA: 'pageA.js',
    pageB: 'pageB.js'
  }
  const devServer = {
    host: 'http://localhost:8080',
    enable: true,
    log: true
  }
  const config = hotReload(entry, loadServer(devServer))

  t.deepEqual(config, {
    pageA: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      'webpack-hud',
      'pageA.js'
    ],
    pageB: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      'webpack-hud',
      'pageB.js'
    ]
  })
})

test('disabled hotreload', t => {
  const entry = 'entry.js'
  const devServer = {
    host: 'http://localhost:8080',
    enable: false
  }
  const config = hotReload(entry, loadServer(devServer))

  t.deepEqual(config, {
    app: ['entry.js']
  })
})

test('no entry', t => {
  process.env.NODE_ENV = 'testing'
  const devServer = {
    host: 'http://localhost:8080',
    enable: false
  }

  t.throws(function () {
    hotReload('', devServer)
  }, 'exit')
})
