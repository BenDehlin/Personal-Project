import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import registerSchema from "../../schema/schema"
import { connect } from "react-redux"
import { setUser } from "../../redux/authReducer"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import axios from "axios"
import { toast } from "react-toastify"

const useStyles = createUseStyles({
  registerForm: {
    ...page
  },
  formSection: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  "@media (max-width: 850px)": {
    registerForm: {
      minHeight: "80vh"
    },
    formSection: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      flexFlow: "column",
      justifyContent: "space-between"
    }
  }
})

const Register = ({ history, setUser }) => {
  const { registerForm, formSection } = useStyles()
  const register = body => {
    axios
      .post("/auth/register", body)
      .then(results => {
        toast.success("Login Successful")
        setUser(results.data)
        history.push("/dashboard")
      })
      .catch(err => toast.error(err.response.data))
  }
  return (
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
      onSubmit={({ username, first, last, age, email, img, password }) => {
        register({ username, first, last, age, email, img, password })
      }}
      validationSchema={registerSchema}
    >
      {(values, isSubmitting) => (
        <Form className={registerForm}>
          <div className={formSection}>
            <CustomTextField name="username" placeholder="Username *" />
            <CustomTextField name="img" placeholder="enter img" />
          </div>
          <div className={formSection}>
            <CustomTextField name="first" placeholder="First Name *" />
            <CustomTextField name="last" placeholder="Last Name *" />
          </div>
          <div className={formSection}>
            <CustomTextField type="number" name="age" placeholder="age" />
            <CustomTextField name="email" placeholder="enter email *" />
          </div>
          <div className={formSection}>
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
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(Register)
