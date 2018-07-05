const path = require('path')
const baseConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'

module.exports = webpackMerge(baseConfig, {
  target: 'node',

  mode: isDev ? 'development' : 'production',

  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },

  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  }
})
