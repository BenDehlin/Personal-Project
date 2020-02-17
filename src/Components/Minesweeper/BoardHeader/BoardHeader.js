import React from "react"
import { createUseStyles } from "react-jss"
import { IoIosRefreshCircle } from "react-icons/io"
import {variables} from '../../../global-styles/global-styles'
const {primary, secondary, red, blue} = variables

const useStyles = createUseStyles({
  header: {
    backgroundColor: "black",
    border: `2px solid ${secondary}`,
    width: 500,
    // minHeight: 100,
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  h1: {
    margin: 10
  },
  icon: {
    backgroundColor: "green",
    borderRadius: "50%",
    marginBottom: 10,
    "&:hover": {
      backgroundColor: 'red'
    }
  }
})

const BoardHeader = ({ flags, reset }) => {
  const { header, h1, icon } = useStyles()
  return (
    <div className={header}>
      <h1 className={h1}>BOMBS: {flags}</h1>
      <IoIosRefreshCircle
        size={50}
        className={icon}
        onClick={() => {
          reset()
        }}
      />
    </div>
  )
}

export default BoardHeader
