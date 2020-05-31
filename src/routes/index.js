import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import { Home } from './assembly'

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <>
        <Switch>
          <Route path='/' component={Home}  />
        </Switch>
      </>
    </Router>
  )
}
