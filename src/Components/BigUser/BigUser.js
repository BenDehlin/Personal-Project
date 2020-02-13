import React, { useEffect } from "react"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"
import { page } from "../../global-styles/global-styles"
import { connect } from "react-redux"
import Button from "@material-ui/core/Button"
import { toast } from "react-toastify"
import axios from "axios"
import useCheckAdmin from '../../hooks/useCheckAdmin'

const useStyles = createUseStyles({
  bigUser: {
    ...page,
    minHeight: '80vh'
  },
  bigUserSection: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  bigUserSide: {
    width: "50%"
  },
  roomSection: {
    minHeight: 100
  }
})

const BigUser = ({ user, match, history }) => {
  useCheckAdmin(user.is_admin, history.push)
  const { bigUser, bigUserSection, bigUserSide, roomSection } = useStyles()
  const [userPage, setUserPage] = useAxios(`/admin/user/${match.params.id}`)
  const {
    username,
    first,
    last,
    img,
    age,
    email,
    rooms,
    roomRequests
  } = userPage
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
  const reRender = () => {
    axios
      .get(`/admin/user/${match.params.id}`)
      .then(results => setUserPage(results.data))
      .catch(err => console.log(err))
  }
  return (
    <>
      {userPage && userPage.id && (
        <div className={bigUser}>
          <div className={bigUserSection}>
            <div className={bigUserSide}>
              <h2>Username: {username}</h2>
              <h2>
                Name: {first} {last}{" "}
              </h2>
              <h2>Email: {email}</h2>
            </div>
            <div className={bigUserSide}>
              <h2>Age: {age}</h2>
              <img src={img || "https://via.placeholder.com/150"} />
            </div>
          </div>
          {rooms.length > 0 && <h2>Rooms:</h2>}
          <div className={bigUserSection}>
            {rooms &&
              rooms.map(room => {
                console.log(room)
                return(
                <div key={room.chatroom_id} className={roomSection}>
                  <h3>{room.chatroom_name}</h3>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      removeRoom({
                        user_id: room.user_id,
                        chatroom_id: room.chatroom_id
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
              )})}
          </div>
          {roomRequests.length > 0 && <h2>Room Requests:</h2>}
          <div className={bigUserSection}>
            {roomRequests &&
              roomRequests.map(room => (
                <div key={room.chatroom_id} className={roomSection}>
                  <h3>{room.chatroom_name}</h3>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      approveRoomJoin({
                        user_id: room.user_id,
                        chatroom_id: room.chatroom_id
                      })
                    }}
                  >
                    Approve
                  </Button>
                  <Button variant="contained" color="secondary">
                    Reject
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

export default connect(mapStateToProps)(BigUser)
