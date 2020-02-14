import React, {useEffect} from 'react'
import useAxios from '../../hooks/useAxios'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
  smallRoomStyle: {
    height: '20vh',
    width: '80%',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 10,
  }
})

const SmallRoom = ({chatroom_name, id}) => {
  const {smallRoomStyle} = useStyles()
  const [users, setUsers] = useAxios(`/admin/room/users/${id}`)
  return (
    <div className={smallRoomStyle}>
      <h1>{chatroom_name}</h1>
      {users && users.map(user => (
        <div>{user.username}</div>
      ))}
    </div>
  )
}

export default SmallRoom