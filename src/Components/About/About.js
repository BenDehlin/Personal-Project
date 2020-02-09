import React from "react"
import {createUseStyles} from 'react-jss'
import { page } from "../../global-styles/global-styles"

const useStyles = createUseStyles({
  about: {
    ...page,
    paddingBottom: 20,
    paddingLeft: 20,
    textAlign: 'left',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})

const About = props => {
  const {about} = useStyles()
  return (
    <div className={about}>
      <h2>Core Technologies</h2>
      <ul>
        <li>Server - Node</li>
        <li>Frontend - React</li>
        <li>State Management/Component Lifecycle:</li>
        <ul>
          <li>React-Redux</li>
          <li>React-Hooks</li>
        </ul>
        <li>HTTP calls - axios</li>
      </ul>
      <h2>Form Construction:</h2>
      <ul>
        <li>Form functionality: Formik</li>
        <li>form basic style: Material-ui</li>
        <li>form validation schema: Yup</li>
      </ul>
      <h2>CSS in JS:</h2>
      <ul>
        <li>JSS</li>
        <li>React-JSS</li>
      </ul>
      <h2>Live Chat:</h2>
      <ul>
        <li>Socket.io</li>
      </ul>
      <h2>Email Service:</h2>
      <ul>
        <li>Nodemailer</li>
      </ul>
      <h2>Alert Messages:</h2>
      <ul>
        <li>React-toastify</li>
      </ul>
    </div>
  )
}

export default About
