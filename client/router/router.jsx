import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/ToplicList/index'
import TopicDetail from '../views/TopicDetail/index'

const TRUE = true

export default () => [
  <Route key="1" path="/" exact render={() => <Redirect push={TRUE} to="/list" />} />,
  <Route key="2" path="/list" component={TopicList} />,
  <Route key="3" path="/detail" component={TopicDetail} />,
]
