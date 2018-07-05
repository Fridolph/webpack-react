import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Routes from '../router/router'

export default class App extends Component {
  componentDidMount() {
    // ...
  }

  render() {
    return [
      <div key="1">
        <Link to="/">首页</Link>&nbsp;
        <Link to="/list">列表页</Link>&nbsp;
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes key="2" />,
    ]
  }
}
