import React, {useEffect} from "react"
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import useAxios from "../../hooks/useAxios"
import { page } from "../../global-styles/global-styles"
import { toast } from "react-toastify"
import SmallUser from '../SmallUser/SmallUser'

const useStyles = createUseStyles({
  usersPage: {
    ...page
  }
})

const Users = ({user, history}) => {
  useEffect(() => {
    if(!user.is_admin){
      history.push('/dashboard')
    }
  }, [user.id, user.is_admin])
  const { usersPage } = useStyles()
  const [users] = useAxios('/admin/users')
  console.log(users)
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
