const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')
const HtmlPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  mode: isDev ? 'development' : 'production',

  entry: {
    app: path.join(__dirname, '../client/app.js')
  },

  plugins: [
    // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。
    new HtmlPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ],

  output: {
    filename: '[name].[hash].js'
  }
})

if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js')
    ]
  }

  config.devServer = {
    host: '0.0.0.0', // 可以使用localhost和本机ip进行访问
    port: 8888,
    contentBase: path.join(__dirname, '../dist'),
    // 编译报错弹窗
    overlay: {
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    },
    hot: true
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
