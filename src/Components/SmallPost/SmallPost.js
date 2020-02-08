import React from "react"
import { createUseStyles } from "react-jss"

const useStyles = createUseStyles({
  smallPost: {}
})

const SmallPost = ({post}) => {
  const classes = useStyles()
  return(
  <div className={classes.smallPost}>
          <p>{post.post_content}</p>
          <img src={post.post_img}/>
  </div>
)}

export default SmallPost
