import React, { useEffect } from "react"
import "./App.css"
import routes from "./routes"
import Header from "./Components/Header/Header"
import { withRouter } from "react-router-dom"
import {getUser} from './redux/authReducer'
import {connect} from 'react-redux'

const App = ({ location }) => {
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  )
}

const mapDispatchToProps = {
  getUser
}

export default connect(null, mapDispatchToProps)(withRouter(App))
