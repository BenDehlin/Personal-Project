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
import Users from './Components/Users/Users'
import BigUser from './Components/BigUser/BigUser'
import Rooms from './Components/Rooms/Rooms'
import Scores from './Components/Scores/Scores'
import Minesweeper from './Components/Minesweeper/Game/Game'
import Multiplayer from './Components/MinesweeperTwo/Multiplayer/Multiplayer'
import ScoreCharts from './Components/ScoreCharts/ScoreCharts'
import LandingPage from './Components/LandingPage/LandingPage'

export default (
  <Switch>
    <Route exact path = '/' component={LandingPage} />
    <Route exact path = '/login' component={Login} />
    <Route path = '/register' component={Register} />
    <Route path = '/dashboard' component={Dashboard} />
    <Route path = '/chat/:room' component={Chat} />
    <Route path = '/forum/:id' component={Forum} />
    <Route exact path = '/post/form' component={PostForm} />
    <Route exact path = '/post/:id' component={BigPost} />
    <Route path = '/post/form/:id' component={PostForm} />
    <Route path = '/about' component={About} />
    <Route path = '/admin/users' component= {Users} />
    <Route path = '/admin/user/:id' component={BigUser} />
    <Route path = '/admin/rooms' component={Rooms} />
    <Route path = '/games/highscores/minesweeper' component={Scores} />
    <Route path = '/games/minesweeper' component={Minesweeper} />
    <Route path = '/games/multiplayer' component={Multiplayer} />
    <Route path = '/games/highscores/charts/minesweeper' component={ScoreCharts} />
  </Switch>
)