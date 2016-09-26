'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const logger = require('./logger')
const is = require('./is')
const isNextWebpack = require('./check').isNextWebpack
const loadTemplate = require('./load-template')

const extractCSS = function (extractcss, config, hash) {
  if (!extractcss) {
    return
  }
  let filename = extractcss

  config.extractCSS = true

  if (extractcss === true) {
    filename = hash ? '[name].[contenthash:7].css' : '[name].css'
  }
  // import plugin
  config.plugins.ExtractText = new ExtractTextPlugin(filename)

  // update css loader
  const sourceMap = config.sourceMap ? '?sourceMap' : ''
  const cssLoader = `css-loader${sourceMap}!postcss-loader${sourceMap}`

  config.module.loaders.css = {
    test: /\.css$/,
    loader: isNextWebpack ?
      ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: cssLoader
      }) :
      ExtractTextPlugin.extract('style-loader', cssLoader)
  }
}

const calcSourceMap = function (sourceMap) {
  if (sourceMap === true) {
    return '#source-map'
  } else if (sourceMap === false) {
    return false
  }
  return sourceMap
}

/**
 * merge
 * @param  {object} userConfig
 * @param  {object} baseConfig
 * @return {object} webpack config
 */
module.exports = function (userConfig, baseConfig) {
  let config = baseConfig

  // entry
  config.entry = userConfig.entry

  // dist
  config.output.path = path.resolve(process.cwd(), userConfig.dist || baseConfig.output.path)

  // publicPath
  config.output.publicPath = userConfig.publicPath || config.output.publicPath

  // template
  if (userConfig.template !== false) {
    Object.assign(config.plugins, loadTemplate(userConfig.template || config.template))
  }

  // format
  if (userConfig.format === 'cjs') {
    config.output.libraryTarget = 'commonjs2'
  } else if (userConfig.format) {
    config.output.libraryTarget = userConfig.format
  }

  // moduleName
  if (userConfig.moduleName) {
    config.output.library = userConfig.moduleName
  }
  if (userConfig.format === 'umd' || userConfig.format === 'amd') {
    config.output.umdNamedDefine = true
  }

  // node_env
  if (is.Object(userConfig.env)) {
    config.plugins.Define = new webpack.DefinePlugin(Object.assign({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }, userConfig.env))
  } else {
    config.plugins.Define = new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        is.nil(userConfig.env) ?
        process.env.NODE_ENV :
        userConfig.env
      )
    })
  }

  // development
  if (process.env.NODE_ENV === 'development') {
    config.devtool = '#eval-source-map'
    config.devServer = userConfig.devServer

    // plugin
    config.plugins.NoErrors = new webpack.NoErrorsPlugin()

    // extractCSS
    if (userConfig.devServer) {
      extractCSS(userConfig.devServer.extractCSS, config, false)

      // clean
      if (is.Boolean(userConfig.devServer.clean)) {
        config.__COOKING_CLEAN__ = userConfig.devServer.clean
      } else {
        config.__COOKING_CLEAN__ = true
      }
    }

    // devtool
    if (!config.devServer ||
        (is.Object(config.devServer) &&
        config.devServer.enable === false)) {
      config.devtool = calcSourceMap(userConfig.sourceMap)
    }
  } else {
    config.devtool = calcSourceMap(userConfig.sourceMap)

    // hash
    userConfig.hash = Boolean(userConfig.hash)
    if (userConfig.hash) {
      config.output.filename = '[name].[chunkhash:7].js'
      config.output.chunkFilename = '[id].[chunkhash:7].js'
    }

    const minimize = userConfig.minimize
    const UglifyJs = new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: Boolean(userConfig.sourceMap)
    })

    const UglifyCSS = isNextWebpack ?
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }) : null

    if (is.Boolean(minimize)) {
      if (minimize) {
        config.plugins.UglifyJs = UglifyJs
        if (UglifyCSS) {
          config.plugins.LoaderOptions = UglifyCSS
        }
      }
    } else if (is.Object(minimize)) {
      if (minimize.js) {
        config.plugins.UglifyJs = UglifyJs
      }

      if (minimize.css) {
        if (UglifyCSS) {
          config.plugins.LoaderOptions = UglifyCSS
        }
      } else if (!isNextWebpack) {
        logger.warn('目前版本暂不支持在 webpack 1.0 具体指定 CSS 是否压缩')
      }
    } else {
      config.plugins.UglifyJs = UglifyJs
      if (UglifyCSS) {
        config.plugins.LoaderOptions = UglifyCSS
      }
    }

    // clean
    if (is.Boolean(userConfig.clean)) {
      config.__COOKING_CLEAN__ = userConfig.clean
    } else {
      config.__COOKING_CLEAN__ = true
    }

    extractCSS(userConfig.extractCSS, config, userConfig.hash)
  }

  // alias
  if (userConfig.alias) {
    config.resolve.alias = userConfig.alias
  }

  // externals
  if (userConfig.externals) {
    config.externals = userConfig.externals
  }

  // postcss
  if (userConfig.postcss) {
    config.postcss = require('./load-postcss')(userConfig.postcss)
  }

  // chunk
  const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
  let chunks = userConfig.chunk

  if (chunks === true) {
    chunks = [
      {
        name: 'vendor',
        minChunks: function (module) {
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(path.join(process.cwd(), 'node_modules')) === 0
          )
        }
      },
      {name: 'manifest', chunks: ['vendor']}
    ]
  }

  if (is.String(chunks)) {
    config.plugins['commons-chunk'] = new CommonsChunkPlugin(chunks)
  } else if (chunks) {
    Object.keys(chunks).forEach(name => {
      config.plugins[`${name}-chunk`] = new CommonsChunkPlugin(chunks[name])
    })
  }

  return config
}
