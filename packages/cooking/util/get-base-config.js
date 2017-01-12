'use strict'

const path = require('path')
const isNextWebpack = require('./check').isNextWebpack

module.exports = function (userConfig) {
  let limit = 1

  if (userConfig.urlLoaderLimit !== false) {
    limit = userConfig.urlLoaderLimit || 10000
  }
  const assetsPath = userConfig.assetsPath || 'static'
  return {
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },

    plugins: {},

    resolve: {
      extensions: (isNextWebpack ? [] : ['']).concat(['.js', '.json'])
    },

    resolveLoader: {},

    module: {
      loaders: {
        js: {
          test: /\.(jsx?|babel|es6)$/,
          include: process.cwd(),
          exclude: /node_modules|bower_components/,
          loaders: ['babel-loader']
        },
        json: {
          test: /\.json$/,
          loaders: ['json-loader']
        },
        css: {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader', 'postcss-loader']
        },
        html: {
          test: /\.html$/,
          loaders: ['html-loader?minimize=false']
        },
        font: {
          test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.posix.join(assetsPath, '[name].[hash:7].[ext]')
          }
        },
        svg: {
          test: /\.svg(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.posix.join(assetsPath, '[name].[hash:7].[ext]')
          }
        },
        image: {
          test: /\.(gif|png|jpe?g)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.posix.join(assetsPath, '[name].[hash:7].[ext]')
          }
        }
      }
    }
  }
}
