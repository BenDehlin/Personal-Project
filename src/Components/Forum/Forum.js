import React from 'react'
import useAxios from "../../hooks/useAxios"
import {createUseStyles} from 'react-jss'
import SmallPost from '../SmallPost/SmallPost'

const useStyles = createUseStyles({
  forum: {
    backgroundColor: 'white',
    margin: {top: '5vh'},
    borderRadius: 10,
    width: '80%',
    minHeight: '80vh',
    boxShadow: '.6em .6em .6em blue',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const Forum = (props) => {
  const [posts, setPosts] = useAxios(`/api/forums/${props.match.params.id}`)
  const classes = useStyles()
  console.log(posts)
  return (
    <div className={classes.forum}>
      {posts && posts.map(post => (
        <SmallPost key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Forum