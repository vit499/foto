import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import AuthPage from 'pages/authPage'
import CreatePage from 'pages/createPage'
import DetailPage from 'pages/detailPage'
import LinkPage from 'pages/linkPage'

const Routes = ({isAuth}) => {
  if(isAuth) {
    return (
      <Switch>
        <Route path="/links" >
          <LinkPage />
        </Route>
        <Route path="/detail/:id" >
          <DetailPage />
        </Route>
        <Route path="/create" exact >
          <CreatePage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    )
  }
  else {
    return (
      <Switch>
        <Route path="/auth" >
          <AuthPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }
}

export default Routes


