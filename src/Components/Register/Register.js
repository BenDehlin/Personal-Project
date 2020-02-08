import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import registerSchema from "../../schema/schema"
import "./Register.css"
import { connect } from "react-redux"
import { register } from "../../redux/authReducer"

const Register = ({ register, history }) => (
  <Formik
    initialValues={{
      username: "",
      first: "",
      last: "",
      age: "",
      email: "",
      img: "",
      password: "",
      confirm: ""
    }}
    onSubmit={(data, { setSubmitting }) => {
      setSubmitting(true)
      const { username, first, last, age, email, img, password } = data
      register({ username, first, last, age, email, img, password })
      setSubmitting(false)
      history.push("/dashboard")
    }}
    validationSchema={registerSchema}
  >
    {(values, isSubmitting) => (
      <Form className="form register-form">
        <div className = "form-section">
          <CustomTextField name="username" placeholder="Username *" />
          <CustomTextField name="img" placeholder="enter img" />
        </div>
        <div className="form-section">
          <CustomTextField name="first" placeholder="First Name *" />
          <CustomTextField name="last" placeholder="Last Name *" />
        </div>
        <div className="form-section">
          <CustomTextField type="number" name="age" placeholder="age" />
          <CustomTextField name="email" placeholder="enter email *" />
        </div>
        <div className="form-section">
          <CustomTextField
            type="password"
            name="password"
            placeholder="password *"
          />
          <CustomTextField
            type="password"
            name="confirm"
            placeholder="confirm password *"
          />
        </div>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
      </Form>
    )}
  </Formik>
)

const mapDispatchToProps = {
  register
}

export default connect(null, mapDispatchToProps)(Register)
