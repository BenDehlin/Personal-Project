import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import Board from "./Board"
import MultiplayerHeader from "./MultiplayerHeader"
import { connect } from "react-redux"
import { createUseStyles } from "react-jss"
import { toast } from "react-toastify"
import { page } from "../../../global-styles/global-styles"
import { useStopwatch } from "react-timer-hook"
import ReactLoading from "react-loading"

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

const Multiplayer = ({ user, history }) => {
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: false
  })
  const { gameStyle } = useStyles()
  const { username, id } = user
  let [grid, setGrid] = useState([])
  let [boardState, setBoardState] = useState({})
  const [flagCount, setFlagCount] = useState(25)
  const ENDPOINT = REACT_APP_ENDPOINT
  const socket = io.connect(ENDPOINT)

  useEffect(() => {
    user && user.id ? getGrid() : history.push("/login")
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
        if (grid.length > 0 && boardState.currentPlayer === user.id) {
          start()
          toast.success("Begin Turn")
        }
      })
      socket.on("reset", () => {
        reset()
      })
      socket.on("gameover", () => {
        pause()
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
      pause()
    } else {
      toast.error("Wait for your turn!")
    }
  }

  const resetBoard = () => {
    if (!boardState.gameRunning) {
      socket.emit("restart")
    }
  }

  const incrementFlag = () => setFlagCount(flagCount + 1)
  const decrementFlag = () => setFlagCount(flagCount - 1)

  return (
    <div className={gameStyle}>
      {grid.length > 0 ? (
        <>
          <MultiplayerHeader
            flagCount={flagCount}
            resetBoard={resetBoard}
            seconds={seconds}
            minutes={minutes}
          />
          <Board
            grid={grid}
            boardState={boardState}
            clickCell={clickCell}
            flagCount={flagCount}
            incrementFlag={incrementFlag}
            decrementFlag={decrementFlag}
          />
        </>
      ) : (
        <div>
          <h3>Waiting for Player Two...</h3>
          <ReactLoading
            type={"bubbles"}
            color={"green"}
            height={500}
            width={400}
          />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const { user } = state.authReducer
  return { user }
}

export default connect(mapStateToProps)(Multiplayer)
