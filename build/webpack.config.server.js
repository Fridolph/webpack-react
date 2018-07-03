const path = require('path')

const dev = Boolean(process.env.WEBPACK_SERVE)

module.exports = {
  target: 'node',

  mode: dev ? 'development' : 'production',

  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },

  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '',
    libraryTarget: 'commonjs2'
  }
}
