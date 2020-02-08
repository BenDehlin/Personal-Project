import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Dashboard from './Components/Dashboard/Dashboard'
import Chat from './Components/Chat/Chat'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Forum from './Components/Forum/Forum'

export default (
  <Switch>
    <Route exact path = '/login' component={Login} />
    <Route path = '/register' component={Register} />
    <Route path = '/dashboard' component={Dashboard} />
    <Route path = '/chat/:room' component={Chat} />
    <Route path = '/forum/:id' component={Forum} />
  </Switch>
)