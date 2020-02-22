import React, { useState } from "react"
import { createUseStyles } from "react-jss"
import { variables } from "../../../global-styles/global-styles"
import { FaBomb } from "react-icons/fa"
import { MdFlag } from "react-icons/md"

const { secondary, primary } = variables
const useStyles = createUseStyles({
  cellStyle: {
    height: 50,
    width: 50,
    backgroundColor: primary,
    border: `1px solid ${secondary}`,
    "&:hover": {
      backgroundColor: "green"
    }
  }
})

const Cell = ({ cell, clickCell }) => {
  const { cellStyle } = useStyles()
  const { x, y, isBomb, isClicked, count } = cell
  let [isFlagged, setIsFlagged] = useState(cell.isFlagged)
  const flagCell = e => {
    e.preventDefault()
    setIsFlagged(isFlagged ? (isFlagged = false) : (isFlagged = true))
  }
  return (
    <div
      className={cellStyle}
      style={{
        backgroundColor: isClicked && "green"
      }}
      onContextMenu={e => flagCell(e)}
      onClick={() => clickCell(x, y)}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: isFlagged && "blue",
          // backgroundColor: isClicked && isBomb && 'red',
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            // backgroundColor: isFlagged && "blue",
            backgroundColor: isClicked && isBomb && "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {isFlagged && <MdFlag size={30} />}
          {isClicked && isBomb && <FaBomb size={25} />}
          {isClicked && !isBomb && count}
        </div>
      </div>
    </div>
  )
}

export default Cell
