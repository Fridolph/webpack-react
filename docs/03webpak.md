## webpack - 前端打包工具

npm i react -S
npm i react-dom -S
npm i webpack -D
npm i webpack-cli -D

npm i babel-core -D
npm i babel-polyfill
npm i babel-loader
npm i babel-preset-env
npm i babel-preset-react


package.json

    "build": "webpack --mode development --config build/webpack.config.js"

.babelrc

```json
{
  "presets": [
    ["env"],
    "react"
  ]
}
```

---

## 服务端渲染

单页应用存在的问题

seo不友好
首次 请求长
