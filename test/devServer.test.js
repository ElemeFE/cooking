import test from 'ava'
import devServer from '../packages/cooking/util/load-server'
const defaultServer = {
  port: 8080,
  hot: true,
  log: true,
  enable: true,
  historyApiFallback: true,
  lazy: false,
  stats: 'errors-only',
  host: '0.0.0.0',
  disableHostCheck: true,
  __host__: 'http://0.0.0.0:8080'
}

test('default config', t => {
  const server = devServer(true)

  t.deepEqual(server, defaultServer)
})

test('disabled server', t => {
  const server = devServer(false)
  const serverA = devServer()
  const result = {
    enable: false,
    stats: 'errors-only'
  }

  t.deepEqual(server, result)
  t.deepEqual(serverA, result)
})

test('config', t => {
  const server = devServer({
    publicPath: '/dist/'
  })
  let config = defaultServer
  config.publicPath = '/dist/'

  t.deepEqual(server, config)
})

test('publicPath is void string', t => {
  const server = devServer({
    publicPath: ''
  })
  let config = defaultServer
  config.publicPath = ''

  t.deepEqual(server, config)
})
