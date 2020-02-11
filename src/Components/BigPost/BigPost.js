import React from "react"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import useAxios from "../../hooks/useAxios"

const useStyles = createUseStyles({
  bigPost: {
    ...page,
    margin: 5,
    padding: 5
  }
})

const BigPost = ({ match }) => {
  const { bigPost } = useStyles()
  const [post] = useAxios(`/api/posts/${match.params.id}`)
  const currentPost = post[0]
  return (
    <section className={bigPost}>
      {currentPost && currentPost.id && (
        <>
          <h1>Title: {currentPost.post_title}</h1>
          <h1>Author: {currentPost.username}</h1>
          <p>{currentPost.post_content}</p>
          <img src={currentPost.post_img || 'https://via.placeholder.com/150'} alt={currentPost.post_title} />
        </>
      )}
    </section>
  )
}

export default BigPost