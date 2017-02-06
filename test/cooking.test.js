import test from 'ava'
import webpack from 'webpack'
import cooking from '../packages/cooking-cli/lib/cooking'

test('cooking set path', t => {
  cooking.set({publicPath: '/'})
  t.is(cooking.config.output.publicPath, '/')

  cooking.set({entry: 'src/index.html'})
  t.is(cooking.config.entry, 'src/index.html')

  cooking.set({dist: '/dist/abc'})
  t.is(cooking.config.output.path, '/dist/abc')
  t.is(cooking.config.output.publicPath, '/dist/')
})

test('cooking set template', t => {
  process.env.NODE_ENV = 'testing'

  let templateCount
  let templateCount2
  let templateCount3
  let templateCount4
  let templateCount5

  cooking.set({template: './src/abc.html'})
  templateCount = Object.keys(cooking.config.plugins).length

  cooking.set({
    template: {
      'index.html': './src/abc.html',
      'pageb.html': 'aaaaa.html',
      'pagec.html': 'aaaaasbbb.html'
    }
  })
  templateCount2 = Object.keys(cooking.config.plugins).length
  t.is(templateCount2 - templateCount, 2)

  cooking.set({
    template: {
      'index.html': './src/abc.html',
      'pageb.html': 'aaaaasbbb.html'
    }
  })
  templateCount3 = Object.keys(cooking.config.plugins).length
  t.is(templateCount3 - templateCount, 1)

  cooking.set({
    template: {
      'index.html': {
        template: './src/aaa.html'
      },
      'page.html': {
        name: 'haha',
        template: './src/bbb.html'
      }
    }
  })
  templateCount4 = Object.keys(cooking.config.plugins).length
  t.is(templateCount4 - templateCount, 1)

  cooking.set({
    template: [
      {
        filename: 'index.html',
        template: './src/aaa.html'
      },
      {
        filename: 'index2.html',
        template: './src/aaa.html'
      },
      {
        filename: 'index3.html',
        template: './src/aaa.html'
      }
    ]
  })

  templateCount5 = Object.keys(cooking.config.plugins).length
  t.is(templateCount5 - templateCount, 2)

  t.throws(function () {
    cooking.set({
      template: [
        {
          template: 'no-filename.html'
        },
        {
          filename: 'filename',
          template: 'aaaa.html'
        }
      ]
    })
  }, 'exit')
})

test('cooking set hash', t => {
  process.env.NODE_ENV = 'production'

  let hasHash = cooking.set({hash: true}).config.output.filename
  let noHash = cooking.set({}).config.output.filename
  let noHash2 = cooking.set({hash: false}).config.output.filename

  t.not(hasHash, noHash)
  t.is(noHash, noHash2)

  process.env.NODE_ENV = 'development'

  let devHasHash = cooking.set({hash: true}).config.output.filename
  let devNoHash = cooking.set({}).config.output.filename
  let devNoHash2 = cooking.set({hash: false}).config.output.filename

  t.is(devHasHash, devNoHash)
  t.is(devNoHash, devNoHash2)
})

test('cooking set format', t => {
  process.env.NODE_ENV = 'production'

  cooking.set({
    entry: './aaa/index.js',
    format: 'cjs'
  })

  t.is(cooking.config.output.libraryTarget, 'commonjs2')

  cooking.set({
    format: 'umd',
    moduleName: 'ABC'
  })

  t.is(cooking.config.output.library, 'ABC')
})

test('cooking set chunk', t => {
  cooking.set({
    chunk: 'vendor'
  })

  const chunk = new webpack.optimize.CommonsChunkPlugin('vendor')

  t.truthy(cooking.config.plugins['commons-chunk'])
  t.is(cooking.config.plugins['commons-chunk'].chunkNames, chunk.chunkNames)

  cooking.set({
    chunk: [
      {
        name: 'commonsA',
        filename: 'commonsA.js'
      },
      {
        name: 'commonsB'
      },
      {
        chunks: ['vendor', 'pageA']
      }
    ]
  })

  const chunkB = new webpack.optimize.CommonsChunkPlugin({
    name: 'commonsB',
    filename: 'commonsB.js'
  })
  const chunkC = new webpack.optimize.CommonsChunkPlugin({
    chunks: ['vendor', 'pageA']
  })

  // 插件存在
  t.truthy(cooking.config.plugins['0-chunk'])

  // 设置参数
  t.is(cooking.config.plugins['1-chunk'].chunkNames, chunkB.chunkNames)

  // 设置 chunks
  t.deepEqual(cooking.config.plugins['2-chunk'].selectedChunks, chunkC.selectedChunks)

  cooking.set({
    chunk: {
      chunkA: {
        name: 'name'
      }
    }
  })

  t.truthy(cooking.config.plugins['chunkA-chunk'])

  cooking.set({
    chunk: true
  })

  t.truthy(cooking.config.plugins['0-chunk'])
  t.truthy(cooking.config.plugins['1-chunk'])
})

test('cooking set extractCSS', t => {
  process.env.NODE_ENV = 'production'

  cooking.set({
    extractCSS: true
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].css')

  cooking.set({
    extractCSS: true,
    hash: true
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].[contenthash:7].css')

  cooking.set({
    extractCSS: false
  })

  t.falsy(cooking.config.plugins.ExtractText)

  cooking.set({
    extractCSS: '[name].abc.css'
  })

  t.is(cooking.config.plugins.ExtractText.filename, '[name].abc.css')

  process.env.NODE_ENV = 'development'
  cooking.set({
    extractCSS: '[name].abc.css'
  })
  t.falsy(cooking.config.plugins.ExtractText)
})

test('cooking set extractCSS in development', t => {
  process.env.NODE_ENV = 'development'

  cooking.set({
    devServer: {
      extractCSS: true
    }
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].css')

  cooking.set({
    devServer: {
      extractCSS: true
    },
    hash: true
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].css')

  cooking.set({
    extractCSS: false
  })

  t.falsy(cooking.config.plugins.ExtractText)

  cooking.set({
    devServer: {
      extractCSS: '[name].abc.css'
    }
  })

  t.is(cooking.config.plugins.ExtractText.filename, '[name].abc.css')
})

test('cooking clean', t => {
  process.env.NODE_ENV = 'production'
  cooking.set({
    clean: true
  })

  t.true(cooking.config.__COOKING_CLEAN__)

  cooking.set({
    clean: false
  })

  t.false(cooking.config.__COOKING_CLEAN__)
})

test('add method', t => {
  const loaderMP4Config = {
    test: /\.mp4$/,
    loaders: ['file-loader']
  }
  const loaderJSONConfig = {
    test: /\.json$/,
    loaders: ['ahhhh']
  }

  cooking.set({})
  cooking.add('loader.mp4', loaderMP4Config)
  cooking.add('loader.json', loaderJSONConfig)
  cooking.add('plugins.abc', 1)

  t.deepEqual(cooking.config.module.loaders.mp4, loaderMP4Config)
  t.deepEqual(cooking.config.module.loaders.json, loaderJSONConfig)
  t.deepEqual(cooking.config.plugins.abc, 1)
})

test('remove method', t => {
  cooking.set({})
  cooking.remove('loader.js')

  t.falsy(cooking.config.module.loaders.js)
})

test('resolve mothod', t => {
  cooking.set({
    entry: {}
  })

  const config = cooking.resolve()

  t.true(Array.isArray(config.module.loaders) || Array.isArray(config.module.rules))
  t.true(Array.isArray(config.plugins))
})

test('sourceMap', t => {
  process.env.NODE_ENV = 'development'

  const config1 = cooking.set({
    entry: {},
    devServer: true,
    sourceMap: true
  }).resolve()
  const config2 = cooking.set({
    entry: {},
    sourceMap: false
  }).resolve()
  const config3 = cooking.set({
    entry: {},
    devServer: true,
    sourceMap: false
  }).resolve()
  const config4 = cooking.set({
    entry: {},
    devServer: {},
    sourceMap: true
  }).resolve()
  const config5 = cooking.set({
    entry: {},
    devServer: {
      enable: false
    },
    sourceMap: true
  }).resolve()
  const config6 = cooking.set({
    entry: {},
    devServer: {},
    sourceMap: '#eval'
  }).resolve()

  t.is(config1.devtool, '#eval-source-map')
  t.is(config2.devtool, false)
  t.is(config3.devtool, false)
  t.is(config4.devtool, '#eval-source-map')
  t.is(config5.devtool, '#source-map')
  t.is(config6.devtool, '#eval')

  process.env.NODE_ENV = 'production'

  const config7 = cooking.set({
    entry: {},
    devServer: {},
    sourceMap: true
  }).resolve()
  const config8 = cooking.set({
    entry: {},
    devServer: {},
    sourceMap: '#eval'
  }).resolve()

  t.is(config7.devtool, '#source-map')
  t.is(config8.devtool, '#eval')
})

test('minimize', t => {
  const config = cooking.set({
    minimize: true
  })

  t.truthy(config.config.plugins.UglifyJs)
})

test('minimize css', t => {
  const config = cooking.set({
    minimize: {
      js: false,
      css: true
    }
  })

  t.falsy(config.config.plugins.UglifyJs)
})

test('minimize js', t => {
  const config = cooking.set({
    minimize: {
      js: true,
      css: false
    }
  })

  t.truthy(config.config.plugins.UglifyJs)
})

test('postcss', t => {
  const config = cooking.set({
    entry: {},
    postcss: [
      function () {},
      'xxx'
    ]
  }).resolve()

  t.is(typeof config.postcss, 'undefined')
})
