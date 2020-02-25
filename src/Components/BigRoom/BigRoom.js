import React from "react"
import useAxios from "../../hooks/useAxios"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import Button from "@material-ui/core/Button"
import axios from 'axios'

const useStyles = createUseStyles({
  bigRoomStyle: {
    ...page,
    flexFlow: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  side: {
    width: "100%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  }
})

const BigRoom = ({ match, history }) => {
  const { bigRoomStyle, side } = useStyles()
  const [room] = useAxios(`/admin/room/users/${match.params.id}`)
  const [requests] = useAxios(`/api/room/requests/${match.params.id}`)
  return (
    <div className={bigRoomStyle}>
      <div className={side}>
        <h1>Users in Room:</h1>
        <ul>
          {room &&
            room.map(element => (
              <div>
                <h3>User: {element.username}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/admin/user/${element.user_id}`)}
                >
                  View User
                </Button>
              </div>
            ))}
        </ul>
      </div>
      <div className={side}>
        <h1>Requests:</h1>
        <ul>
          {requests &&
            requests.map(element => (
              <div>
                <h3>User: {element.username}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/admin/user/${element.user_id}`)}
                >
                  View User
                </Button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default BigRoom
