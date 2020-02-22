import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import Board from "./Board"
import MultiplayerHeader from './MultiplayerHeader'
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import { toast } from "react-toastify"
import { page } from "../../../global-styles/global-styles"

require("dotenv").config()
const { REACT_APP_ENDPOINT } = process.env
    const useStyles = createUseStyles({
      gameStyle: {
        ...page,
        margin: 5,
        padding: 10,
        marginBottom: 20
      }
    })

const Multiplayer = ({ user }) => {
  const { gameStyle } = useStyles()
  const { username, id } = user
  let [grid, setGrid] = useState([])
  let [boardState, setBoardState] = useState({})
  const ENDPOINT = REACT_APP_ENDPOINT
  const socket = io.connect(ENDPOINT)

  useEffect(() => {
    getGrid()
    return () => {
      socket.emit("leaveminesweeper", { username, id, grid, boardState })
      socket.disconnect()
    }
  }, [])

  const getGrid = async () => {
    if (id) {
      await socket.emit("joinminesweeper", { username, id })
      await socket.emit("gengrid")
      socket.on("grid", ({ grid, boardState }) => {
        setGrid((grid = grid))
        setBoardState((boardState = boardState))
        if (boardState.currentPlayer === user.id) {
          toast.success("Begin Turn")
        }
      })
    }
  }

  const clickCell = async (x, y) => {
    if (
      boardState.currentPlayer === user.id &&
      !grid[x][y].isClicked &&
      !grid[x][y].isFlagged
    ) {
      await socket.emit("clickcell", { x, y, grid, boardState })
    } else {
      toast.error("Wait for your turn!")
    }
  }

  const flagCell = (x, y, e) => {
    e.preventDefault()
    console.log('right click')
    let newGrid = [...grid]
    newGrid[x][y].isFlagged
      ? (newGrid[x][y].isFlagged = false)
      : (newGrid[x][y].isFlagged = true)
    setGrid((grid = newGrid))
  }

  return (
    <div className={gameStyle}>
      <MultiplayerHeader />
      <Board
        grid={grid}
        boardState={boardState}
        clickCell={clickCell}
        flagCell={flagCell}
      />
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

export default connect(mapStateToProps)(Multiplayer)
