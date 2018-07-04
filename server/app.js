const fs = require('fs')
const path = require('path')
const express = require('express')
const ReactSSR = require('react-dom/server')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

if (!isDev) {
  const serverEntry = require('../dist/server-entry').default
  const tplPath = path.join(__dirname, '../dist/index.html')
  const template = fs.readFileSync(tplPath, 'utf8')

  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', (req, res) => {
    const appStr = ReactSSR.renderToString(serverEntry)
    res.end(template.replace('<!-- app -->', appStr))
  })
} else {
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}

app.listen(3333, () => {
  console.log('server is running at port 3333');
})
