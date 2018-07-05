import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('appState') @observer
export default class TopicList extends Component {
  componentDidMount() {
    // console.log(this.props.appState)
  }

  changeName = (e) => {
    this.props.appState.changeName(e.target.value)
  }

  add = () => {
    this.props.appState.add()
  }

  jian = () => {
    this.props.appState.jian()
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <button type="button" onClick={this.add}>+</button>
        <button type="button" onClick={this.jian}>-</button>
        <p>
          {this.props.appState.msg}
        </p>
      </div>
    )
  }
}
