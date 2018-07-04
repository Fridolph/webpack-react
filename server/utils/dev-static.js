const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
let serverBundle

serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))
  // 读取bundle信息
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  // 读取出来是stream
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = app => {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', (req, res) => {
    getTemplate()
      .then(tpl => {
        const content = ReactDomServer.renderToString(serverBundle)
        res.send(tpl.replace('<!--app-->'), content)
      })
  })
}
