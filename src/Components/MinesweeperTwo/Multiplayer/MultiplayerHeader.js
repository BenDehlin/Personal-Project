import React from "react"
import { createUseStyles } from "react-jss"
import { IoIosRefreshCircle } from "react-icons/io"
import { variables } from "../../../global-styles/global-styles"
const { primary, secondary } = variables

const useStyles = createUseStyles({
  header: {
    backgroundColor: "black",
    border: `2px solid ${secondary}`,
    width: 500,
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white"
  },
  headerSection: {
    width: "30%",
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid black",
    "&:hover": { backgroundColor: "white", color: "black" }
  },
  h1: {
    margin: 10
  },
  icon: {
    backgroundColor: "green",
    borderRadius: "50%",
    marginBottom: 10,
    "&:hover": {
      backgroundColor: "red"
    }
  }
})

const MultiplayerHeader = ({
  flags,
  resetBoard,
  minutes,
  seconds,
  score,

}) => {
  const { header, h1, icon, headerSection } = useStyles()
  return (
    <div className= {header}></div>
  )
}

export default MultiplayerHeader