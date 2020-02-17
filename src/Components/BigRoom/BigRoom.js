import React from 'react'
import useAxios from '../../hooks/useAxios'

const BigRoom = ({match}) => {
  const [room, setRoom] = useAxios(`/api/`)
  return (
    <div>Big Room</div>
  )
}

export default BigRoom