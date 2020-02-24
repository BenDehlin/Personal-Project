import React, { useEffect } from "react"
import routes from "./routes"
import Header from "./Components/Header/Header"
import AdminSidebar from "./Components/AdminSidebar/AdminSidebar"
import { withRouter } from "react-router-dom"
import { getUser } from "./redux/authReducer"
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import { variables } from "./global-styles/global-styles"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const { primary, red, blue } = variables
const useStyles = createUseStyles({
  app: {
    backgroundColor: blue,
    textAlign: "center",
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    minHeight: "100vh"
  },
  sideBarLayout: {
    width: '100%',
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center'
  },
})

const App = ({ getUser, user, location }) => {
  const { app, sideBarLayout } = useStyles()
  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className={app}>
      <Header />
      <div className={sideBarLayout}>
        {user && user.is_admin && location.pathname !== '/games/highscores/charts/minesweeper'  && <AdminSidebar />}
        {routes}
      </div>
      <ToastContainer />
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
