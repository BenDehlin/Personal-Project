import React from "react"
import useAxios from "../../hooks/useAxios"
// import { withRouter } from "react-router-dom"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import SmallPost from "../SmallPost/SmallPost"

const useStyles = createUseStyles({
  forum: {
    backgroundColor: "white",
    margin: { top: "5vh" },
    borderRadius: 10,
    width: "80%",
    minHeight: "80vh",
    boxShadow: ".6em .6em .6em blue",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  }
})

const Forum = ({ history, match }) => {
  const [posts, setPosts] = useAxios(`/api/forums/${match.params.id}`)
  const classes = useStyles()
  return (
    <div className={classes.forum}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(`/post/form/${match.params.id}`)}
      >
        Create
      </Button>
      {posts &&
        posts.map(post => (
          <SmallPost key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Forum
