import React from "react"
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"
import { page } from "../../global-styles/global-styles"
import SmallUser from '../SmallUser/SmallUser'
import useCheckAdmin from '../../hooks/useCheckAdmin'

const useStyles = createUseStyles({
  usersPage: {
    ...page,
    margin: {bottom: '5vh'}
  }
})

const Users = ({user, history}) => {
  useCheckAdmin(user.is_admin, history.push)
  const { usersPage } = useStyles()
  const [users] = useAxios('/admin/users')
  return (
    <div className={usersPage}>
      <h1>Users</h1>
      {users && users.map(element => (
        <SmallUser key={element.id} user={element} />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

export default connect(mapStateToProps)(Users)
