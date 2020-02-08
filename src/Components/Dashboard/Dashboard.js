import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { getUser } from "../../redux/authReducer"
import Button from "@material-ui/core/Button"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"

const useStyles = createUseStyles({
  dashboard: {
    backgroundColor: "white",
    margin: { top: "5vh" },
    borderRadius: 10,
    width: "80%",
    minHeight: "80vh",
    boxShadow: ".6em .6em .6em blue",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  side: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

const Dashboard = ({ user, getUser, history }) => {
  const classes = useStyles()
  const [forums, setForums] = useAxios("/api/forums")
  // useEffect(() => {
  //   getUser()
  // }, [getUser])
  return (
    <div className={classes.dashboard}>
      {user && (
        <>
          <div className={classes.side}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/chat/1")}
            >
              Chat 1
            </Button>
          </div>
          <div className={classes.side}>
            {forums && forums.map(forum => (
              <Button
                key={forum.id}
                variant="contained"
                color="secondary"
                onClick={() => history.push("/forum/1")}
              >{forum.forum_name}</Button>
            ))}
          </div>
        </>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
