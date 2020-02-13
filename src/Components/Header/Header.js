import React from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { setUser } from "../../redux/authReducer"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { TiHomeOutline } from "react-icons/ti"
import { AiOutlineLogout, AiOutlineQuestion } from "react-icons/ai"
import { variables } from "../../global-styles/global-styles"

const { secondary } = variables
const useStyles = createUseStyles({
  header: {
    backgroundColor: "#3f51b5",
    display: "flex",
    width: "100%",
    height: "10vh",
    justifyContent: "center",
    alignItems: "center"
  },
  nav: {
    display: "flex",
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  icons: {
    color: secondary,
    "&:hover": {
      color: "white"
    }
  },
  questionIcon: {
    color: secondary,
    borderRadius: '50%',
    "&:hover": {
      color: "white",
      backgroundColor: secondary
    }
  },
})

const Header = ({ user, setUser, history, location }) => {
  const { header, nav, icons, questionIcon } = useStyles()
  const logout = () => {
    axios
      .post("/auth/logout")
      .then(() =>
        setUser({
          id: "",
          username: "",
          first: "",
          last: "",
          email: "",
          img: "",
          age: ""
        })
      )
      .catch(err => console.log(err))
  }
  return (
    <header className={header}>
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      user &&
      user.id ? (
        <nav className={nav}>
          <AiOutlineQuestion
            className={questionIcon}
            size={50}
            onClick={() => history.push("/about")}
          />
          <TiHomeOutline
            className={icons}
            size={50}
            onClick={() => history.push("/dashboard")}
          />
          <AiOutlineLogout
            className={icons}
            size={50}
            onClick={() => {
              logout()
              history.push("/login")
            }}
          />
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              logout()
              history.push("/login")
            }}
          >
            Logout
          </Button> */}
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              logout()
              history.push("/about")
            }}
          >
            About
          </Button> */}
        </nav>
      ) : (
        <nav className={nav}>
          {location.pathname === "/login" ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/register")}
            >
              Register
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          )}
          <AiOutlineQuestion
            className={questionIcon}
            size={50}
            onClick={() => history.push("/about")}
          />
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              logout()
              history.push("/about")
            }}
          >
            About
          </Button> */}
        </nav>
      )}
    </header>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
