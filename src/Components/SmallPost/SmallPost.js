import React from "react"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"

const useStyles = createUseStyles({
  smallPost: {
    border: '1px solid black',
    margin: 5,
    padding: 5,
    minHeight: 150,
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  postSection: {
    minHeight: 150,
    width: "40%"
  },
  postImage: {
    height: 150
  },
  buttonSection: {
    minHeight: 150,
    width: "20%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    alignItems: "center"
  }
})

const SmallPost = ({ user, post, history, getPosts }) => {
  const { smallPost, postSection, postImage, buttonSection } = useStyles()
  const deletePost = id => {
    axios
      .delete(`/api/posts/${id}`)
      .then(() => getPosts())
      .catch(err => console.log(err))
  }
  return (
    <div className={smallPost}>
      <div className={postSection}>
        <h1>{post.post_title}</h1>
        <p>{post.post_content}</p>
      </div>
      <div className={postSection}>
        <img src={post.post_img} alt={post.post_title} className={postImage} />
      </div>
      <div className={buttonSection}>
        {user && (user.id === post.user_id || user.is_admin) && (
          <>
            {user.id === post.user_id && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/post/form/${post.id}`)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </Button>
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`/post/${post.id}`)}
        >
          View Post
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

export default connect(mapStateToProps)(withRouter(SmallPost))
