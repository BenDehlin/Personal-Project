import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import { connect } from "react-redux"
import { setUser } from "../../redux/authReducer"
import { loginSchema } from "../../schema/schema"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import axios from 'axios'
import {toast} from 'react-toastify'

const useStyles = createUseStyles({
  loginForm: {
    ...page
  }
})

const Login = ({ history, setUser }) => {
  const { loginForm } = useStyles()
  const login = (body) => {
    axios.post('/auth/login', body)
    .then(results => {
      toast.success('Login Successful')
      setUser(results.data)
      history.push("/dashboard")
    }).catch(err => toast.error(err.response.data))
  }
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      onSubmit={({ username, password }) => {
        login({ username, password })
      }}
      validationSchema={loginSchema}
    >
      {(values, isSubmitting) => (
        <Form className={loginForm}>
          <CustomTextField name="username" placeholder="Username *" />
          <CustomTextField
            type="password"
            name="password"
            placeholder="password *"
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(Login)
