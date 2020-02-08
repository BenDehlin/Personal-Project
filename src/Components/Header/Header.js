import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../../redux/authReducer"
import {createUseStyles} from 'react-jss'
import Button from '@material-ui/core/Button'

const useStyles = createUseStyles({
  header: {
    backgroundColor: '#3f51b5',
    display: 'flex',
    width: '100%',
    height: '10vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  nav: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const Header = ({ user, logout, history, location }) => {
  const {header, nav} = useStyles()
return (
  <header className={header}>
    {location.pathname !== "/login" && location.pathname !== "/register" ? (
      <nav className={nav}>
        <Button 
        variant="contained"
        color="secondary"
        onClick={() => history.push("/dashboard")}>Home</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            logout()
            history.push("/login")
          }}
        >
          Logout
        </Button>
      </nav>
    ) : (
      <nav className={nav}>
        {location.pathname === "/login" ? (
          <Button 
          variant="contained"
          color="secondary"
          onClick={() => history.push("/register")}>Register</Button>
        ) : (
          <Button 
          variant="contained"
          color="secondary"
          onClick={() => history.push("/login")}>Login</Button>
        )}
      </nav>
    )}
  </header>
)}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
