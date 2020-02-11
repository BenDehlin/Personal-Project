import React from "react"
import { connect } from "react-redux"
import { getUser } from "../../redux/authReducer"
import Button from "@material-ui/core/Button"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"
import { page } from "../../global-styles/global-styles"

const useStyles = createUseStyles({
  dashboard: {
    ...page,
    flexFlow: "row",
    minHeight: "80vh"
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

const Dashboard = ({ user, history }) => {
  const classes = useStyles()
  const [forums] = useAxios("/api/forums")
  const [rooms] = useAxios("/api/rooms/user")

  return (
    <div className={classes.dashboard}>
      {user && (
        <>
          <div className={classes.side}>
            {rooms &&
              rooms.map(room => (
                <Button
                key={room.id}
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push(`/chat/${room.id}`)}
                >
                  Chat 1
                </Button>
              ))}
          </div>
          <div className={classes.side}>
            {forums &&
              forums.map(forum => (
                <Button
                  key={forum.id}
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push(`/forum/${forum.id}`)}
                >
                  {forum.forum_name}
                </Button>
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
