import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppNavigationDrawer from './components/AppNavigationDrawer'

// import Landing from './pages/Landing'
// import TeacherList from './pages/TeacherList'
// import TeacherForm from './pages/TeacherForm'

import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'
import AboutUs from './pages/AboutUs'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'

function Routes () {
  return (
    <BrowserRouter>
      <Switch>
      <UnauthenticatedRoute exact path="/signin">
          <Route path="/signin" component={SignIn} />
        </UnauthenticatedRoute>
        <AuthenticatedRoute>
          <AppNavigationDrawer path="/">
            <Route path="/" exact component={Dashboard} />
            <Route path="/about" exact component={AboutUs} /> 
          </AppNavigationDrawer>
        </AuthenticatedRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
