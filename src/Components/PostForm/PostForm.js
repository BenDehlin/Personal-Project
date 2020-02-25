import React, { useState, useEffect } from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import { createUseStyles } from "react-jss"
import { connect } from "react-redux"
import CustomTextField from "../CustomTextField/CustomTextField"
import { page } from "../../global-styles/global-styles"
import { toast } from "react-toastify"
import axios from "axios"
import { postSchema } from "../../schema/schema"

const useStyles = createUseStyles({
  postForm: {
    ...page
  },
  formSection: {}
})

const PostForm = ({ user, match, history, forum_id }) => {
  const { postForm, formSection } = useStyles()
  const [post_title, setPostTitle] = useState("")
  const [post_content, setPostContent] = useState("")
  const [post_img, setPostImg] = useState("")
  const user_id = user.id

  useEffect(() => {
    if (user && user.id && match.params.id) {
      axios
        .get(`/api/posts/${match.params.id}`)
        .then(results => {
          const post = results.data[0]
          if (user.id === post.user_id) {
            setPostTitle(post.post_title)
            setPostContent(post.post_content)
            setPostImg(post.post_img)
          }
        })
        .catch(err => console.log(err))
    } else if (!user.id) {
      history.push("/login")
    }
  }, [match.params.id, user.id])

  const submitPost = body => {
    if (user && user.id && match.params.id) {
      axios
        .put(`/api/posts/${match.params.id}`, body)
        .then(() => history.push(`/forum/${forum_id}`))
        .catch(err => toast.error(err.response.data))
    } else {
      axios
        .post("/api/posts", body)
        .then(() => history.push(`/forum/${forum_id}`))
        .catch(err => toast.error(err.response.data))
    }
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        post_title,
        post_content,
        post_img
      }}
      onSubmit={({ post_title, post_content, post_img }) => {
        submitPost({ user_id, forum_id, post_title, post_content, post_img })
      }}
      validationSchema={postSchema}
    >
      {(values, isSubmitting) => (
        <Form className={postForm}>
          <div className={formSection}>
            <CustomTextField name="post_title" placeholder="Title *" />
            <CustomTextField name="post_img" placeholder="enter img" />
          </div>
          <div className={formSection}>
            <CustomTextField name="post_content" placeholder="Content *" />
          </div>
          {user && user.id && forum_id && (
            <div>
              <Button
                disabled={isSubmitting}
                variant="contained"
                color="secondary"
                onClick={() => history.goBack()}
              >
                Back To Forum
              </Button>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit Post
              </Button>
            </div>
          )}
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </Form>
      )}
    </Formik>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  const { forum_id } = state.forumReducer
  return { user, forum_id }
}

export default connect(mapStateToProps)(PostForm)
