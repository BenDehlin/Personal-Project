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
  },
  userSection: {
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    },
    minWidth: 200,
    margin: 10,
    padding: 10,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  "@media (max-width: 850px)": {
    bigRoomStyle: {
      flexFlow: "column"
    }
  }
})

const BigRoom = ({ match, history }) => {
  const { bigRoomStyle, side, userSection, buttonSection } = useStyles()
  const [room, setRoom] = useAxios(`/admin/room/users/${match.params.id}`)
  const [requests, setRequests] = useAxios(
    `/api/room/requests/${match.params.id}`
  )

  const approveRoomJoin = body => {
    axios
      .post("/admin/room/approve", body)
      .then(results => {
        toast.success(results.data)
        reRender()
      })
      .catch(err => console.log(err))
  }
  const removeRoom = body => {
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
              <div key={element.id} className={userSection}>
                <h3>User: {element.username}</h3>
                <div className={buttonSection}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(`/admin/user/${element.user_id}`)
                    }
                  >
                    View
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
                    X
                  </Button>
                </div>
              </div>
            ))}
        </ul>
      </div>
      <div className={side}>
        <h1>Requests:</h1>
        <ul>
          {requests &&
            requests.map(element => (
              <div key={element.id} className={userSection}>
                <h3>User: {element.username}</h3>
                <div className={buttonSection}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      history.push(`/admin/user/${element.user_id}`)
                    }
                  >
                    View
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
              </div>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default BigRoom
