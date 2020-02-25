import React from "react"
import useAxios from "../../hooks/useAxios"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { toast } from "react-toastify"

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
  const [room, setRoom] = useAxios(`/admin/room/users/${match.params.id}`)
  const [requests, setRequests] = useAxios(
    `/api/room/requests/${match.params.id}`
  )

  const approveRoomJoin = body => {
    console.log(body)
    axios
      .post("/admin/room/approve", body)
      .then(results => {
        toast.success(results.data)
        reRender()
      })
      .catch(err => console.log(err))
  }
  const removeRoom = body => {
    console.log(body)
    axios.post("/admin/room/remove", body).then(results => {
      toast.success(results.data)
      reRender()
    })
  }
  const reRender = async () => {
    axios
      .get(`/admin/room/users/${match.params.id}`)
      .then(results => setRoom(() => results.data))
      .catch(err => console.log(err))
    axios
      .get(`/api/room/requests/${match.params.id}`)
      .then(results => setRequests(() => results.data))
      .catch(err => console.log(err))
  }
  return (
    <div className={bigRoomStyle}>
      <div className={side}>
        <h1>Users in Room:</h1>
        <ul>
          {room &&
            room.map(element => (
              <div key={element.id}>
                <h3>User: {element.username}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/admin/user/${element.user_id}`)}
                >
                  View User
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    removeRoom({
                      user_id: element.user_id,
                      chatroom_id: element.chatroom_id
                    })
                  }
                >
                  Remove
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
              <div key={element.id}>
                <h3>User: {element.username}</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/admin/user/${element.user_id}`)}
                >
                  View User
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    approveRoomJoin({
                      user_id: element.user_id,
                      chatroom_id: element.chatroom_id
                    })
                  }}
                >
                  Approve
                </Button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default BigRoom
