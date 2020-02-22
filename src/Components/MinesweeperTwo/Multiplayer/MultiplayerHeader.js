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
    color: "white",
    padding: 10
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
  flagCount,
  resetBoard,
  minutes,
  seconds,
  score
}) => {
  const { header, h1, icon, headerSection } = useStyles()
  return (
    <div className={header}>
      <div className={headerSection}>
        <h3 className={h1}>
          FLAGS:{" "}
          {flagCount < 10 && flagCount >= 0 ? "0" + flagCount : flagCount}
        </h3>
      </div>
      <IoIosRefreshCircle
        size={50}
        className={icon}
        onClick={() => {
          resetBoard()
        }}
      />
      <div className={headerSection}>
        <h3 className={h1}>TIME: {seconds}</h3>
      </div>
    </div>
  )
}

export default MultiplayerHeader
