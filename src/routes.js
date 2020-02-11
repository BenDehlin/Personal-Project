import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Dashboard from './Components/Dashboard/Dashboard'
import Chat from './Components/Chat/Chat'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Forum from './Components/Forum/Forum'
import About from './Components/About/About'
import PostForm from './Components/PostForm/PostForm'
import BigPost from './Components/BigPost/BigPost'

export default (
  <Switch>
    <Route exact path = '/login' component={Login} />
    <Route path = '/register' component={Register} />
    <Route path = '/dashboard' component={Dashboard} />
    <Route path = '/chat/:room' component={Chat} />
    <Route path = '/forum/:id' component={Forum} />
    <Route exact path = '/post/form' component={PostForm} />
    <Route exact path = '/post/:id' component={BigPost} />
    <Route path = '/post/form/:id' component={PostForm} />
    <Route path = '/about' component={About} />
  </Switch>
)