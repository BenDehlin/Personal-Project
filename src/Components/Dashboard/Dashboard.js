import React from "react"
import { connect } from "react-redux"
import { getUser } from "../../redux/authReducer"
import Button from "@material-ui/core/Button"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"
import { page } from "../../global-styles/global-styles"
import axios from 'axios'
import {toast} from 'react-toastify'

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
  },
  roomSection: {
    border: "solid black 1px",
    width: '100%'
  }
})

const Dashboard = ({ user, history }) => {
  const { dashboard, side, roomSection } = useStyles()
  const [forums] = useAxios("/api/forums")
  const [otherRooms] = useAxios("/api/rooms/other")
  const [rooms] = useAxios("/api/rooms/user")

  const requestAccess = (chatroom_id) => {
    axios.post(`/api/rooms/join/${chatroom_id}`)
    .then((results) => toast.success(results.data))
    .catch(err => console.log(err))
  }

  return (
    <div className={dashboard}>
      {user && (
        <>
          <div className={side}>
            {rooms &&
              rooms.map(room => (
                <div className={roomSection}>
                  <p>{room.chatroom_name}</p>
                  <Button
                    key={room.id}
                    variant="contained"
                    color="primary"
                    onClick={() => history.push(`/chat/${room.id}`)}
                  >
                    Join
                  </Button>
                </div>
              ))}
            {otherRooms &&
              otherRooms.map(room => (
                <div className={roomSection}>
                  <p>{room.chatroom_name}</p>
                  <Button
                    key={room.id}
                    variant="contained"
                    color="secondary"
                    onClick={() => requestAccess(room.id)}
                  >
                    Request Access
                  </Button>
                </div>
              ))}
          </div>
          <div className={side}>
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
