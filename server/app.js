const fs = require('fs')
const path = require('path')
const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry').default

const tplPath = path.join(__dirname, '../dist/index.html')
const template = fs.readFileSync(tplPath, 'utf8')

const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist')))

app.get('*', (req, res) => {
  const appStr = ReactSSR.renderToString(serverEntry)
  res.end(template.replace('<!--app-->', appStr))
})

app.listen(3333, () => {
  console.log('server is running at port 3333');
})
