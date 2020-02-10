import React, {useEffect} from "react"
import useAxios from "../../hooks/useAxios"
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import SmallPost from "../SmallPost/SmallPost"
import {setForum} from '../../redux/forumReducer'

const useStyles = createUseStyles({
  forum: {
    backgroundColor: "white",
    margin: { top: "5vh" },
    padding: 10,
    borderRadius: 10,
    width: "80%",
    minHeight: "80vh",
    boxShadow: ".6em .6em .6em blue",
    display: "flex",
    flexFlow: 'column',
    justifyContent: "space-around",
    alignItems: "center"
  }
})

const Forum = ({ history, match, setForum }) => {
  const [posts, setPosts] = useAxios(`/api/forums/${match.params.id}`)
  const classes = useStyles()
  useEffect(() => {
    setForum(match.params.id)
  }, [])
  return (
    <div className={classes.forum}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push(`/post/form`)}
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

const mapDispatchToProps= {
  setForum
}

export default connect(null, mapDispatchToProps)(Forum)
