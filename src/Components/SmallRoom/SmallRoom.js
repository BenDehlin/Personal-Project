import React from "react"
import useAxios from "../../hooks/useAxios"
import { createUseStyles } from "react-jss"
import {withRouter} from 'react-router-dom'
import { variables } from "../../global-styles/global-styles"

const { primary, secondary } = variables

const useStyles = createUseStyles({
  smallRoomStyle: {
    height: "20vh",
    width: "80%",
    backgroundColor: primary,
    color: secondary,
    border: `1px solid ${primary}`,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: secondary,
      color: primary
    }
  }
})

const SmallRoom = ({ chatroom_name, id, history }) => {
  const { smallRoomStyle } = useStyles()
  const [users] = useAxios(`/admin/room/users/${id}`)
  return (
    <div
      className={smallRoomStyle}
      onClick={() => history.push(`/admin/room/${id}`)}
    >
      <h1>{chatroom_name}</h1>
      {users && users.map(user => <div>{user.username} </div>)}
    </div>
  )
}

export default withRouter(SmallRoom)
