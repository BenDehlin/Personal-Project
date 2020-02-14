import React from "react"
import useAxios from "../../hooks/useAxios"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import SmallRoom from "../SmallRoom/SmallRoom"
import useCheckAdmin from "../../hooks/useCheckAdmin"
import { connect } from "react-redux"

const useStyles = createUseStyles({
  roomsStyle: {
    ...page
  }
})

const Rooms = ({ user, history }) => {
  useCheckAdmin(user.id, history.push)
  const { roomsStyle } = useStyles()
  const [rooms, setRooms] = useAxios("/api/rooms/all")

  return (
    <div className={roomsStyle}>
      <h1>Rooms</h1>
      {rooms &&
        rooms.map(room => {
          console.log(room)
          return <SmallRoom key={room.id} id={room.id} chatroom_name={room.chatroom_name} />
        })}
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

export default connect(mapStateToProps)(Rooms)