import React, { useEffect } from "react"
import routes from "./routes"
import Header from "./Components/Header/Header"
import { withRouter } from "react-router-dom"
import {getUser} from './redux/authReducer'
import {connect} from 'react-redux'
import {createUseStyles} from 'react-jss'
import {variables} from './global-styles/global-styles'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const {secondary} = variables
const useStyles = createUseStyles({
  app: {
    backgroundColor: secondary,
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh'
  }
})

const App = () => {
  const {app} = useStyles()
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className={app}>
      <Header />
      {routes}
      <ToastContainer />
    </div>
  )
}

const mapDispatchToProps = {
  getUser
}

export default connect(null, mapDispatchToProps)(withRouter(App))
