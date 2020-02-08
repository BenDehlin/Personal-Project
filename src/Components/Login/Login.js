import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import { connect } from "react-redux"
import { login, getUser } from "../../redux/authReducer"
import { loginSchema } from "../../schema/schema"

const Login = ({ history, login }) => (
  <Formik
    initialValues={{
      username: "",
      password: ""
    }}
    onSubmit={(data, { setSubmitting }) => {
      setSubmitting(true)
      const { username, password } = data
      login({ username, password })
      setSubmitting(false)
      history.push("/dashboard")
    }}
    validationSchema={loginSchema}
  >
    {(values, isSubmitting) => (
      <Form className="form login-form">
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

const mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(Login)
