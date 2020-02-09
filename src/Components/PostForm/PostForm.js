import React, {useState, useEffect} from 'react'
import {createUseStyles} from 'react-jss'
import {connect} from 'react-redux'
import {Formik, Form} from 'formik'
import CustomTextField from '../CustomTextField/CustomTextField'
import { page } from "../../global-styles/global-styles"

const useStyles = createUseStyles({
  postForm: {
    ...page
  }
})

const PostForm = ({user, match, history}) => {
  const [post_content, setPostContent] = useState('')
  const [post_img, setPostImg] = useState('')

  return (
    <div>Post Form</div>
  )
}

const mapStateToProps = (state) => {
  const {user} = state.authReducer
  return {user}
}

export default connect(mapStateToProps)(PostForm)