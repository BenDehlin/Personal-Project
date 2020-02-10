import React from "react"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const useStyles = createUseStyles({
  smallPost: {}
})

const SmallPost = ({ user, post, history }) => {
  const classes = useStyles()
  return (
    <div className={classes.smallPost}>
      <p>{post.post_content}</p>
      <img src={post.post_img} />
      {user && user.id === post.user_id &&
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(`/post/form/${post.id}`)}
      >Edit</Button>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const {user} = state.authReducer
  return {user}
}

export default connect(mapStateToProps)(withRouter(SmallPost))