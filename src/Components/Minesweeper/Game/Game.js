import React, { useState, useEffect } from "react"
import BoardHeader from "../BoardHeader/BoardHeader"
import BoardClass from "../Board/BoardClass"
import {createUseStyles} from 'react-jss'
import {page} from '../../../global-styles/global-styles'

const useStyles = createUseStyles({
  gameStyle: {
    ...page,
    marginTop: 5,
    padding: 10,
    marginBottom: 20
  }
})

const Game = () => {
  const {gameStyle} = useStyles()
  const [rows, setRows] = useState(10)
  const [columns, setColumns] = useState(10)
  const [bombs, setBombs] = useState(25)
  const [flags, setFlags] = useState(25)
  //Need to figure out making this immutable again with useRef or external library
  let [grid, setGrid] = useState([])

  useEffect(() => {
    genBoard(10, 10, 25, 25)
  }, [])

  const genBoard = async (numRows, numColumns, numBombs, numFlags) => {
    setRows(numRows)
    setColumns(numColumns)
    setBombs(numBombs)
    setFlags(numFlags)
    await genGrid(numRows, numColumns)
    await genBombs(numRows, numColumns, numBombs)
  }

  const genGrid = (numRows, numColumns) => {
    grid = []
    for (let x = 0; x < numRows; x++) {
      grid.push([])
      for (let y = 0; y < numColumns; y++) {
        grid[x].push({
          x,
          y,
          isBomb: false,
          isClicked: false,
          isFlagged: false
        })
      }
    }
    setGrid(grid)
  }
  const genBombs = (numRows, numColumns, numBombs) => {
    const newGrid = [...grid]
    for (let i = 0; i < numBombs; i++) {
      let x = Math.floor(Math.random() * numRows)
      let y = Math.floor(Math.random() * numColumns)
      newGrid[x][y].isBomb = true
    }
    setGrid(newGrid)
  }

  const reset = () => {
    genBoard(10, 10, 25, 25)
  }

  const incrementFlags = () => {
    setFlags(flags + 1)
  }
  const decrementFlags = () => {
    setFlags(flags - 1)
  }

  return (
    <div
    className={gameStyle}
      // style={{
      //   display: "flex",
      //   flexFlow: "column",
      //   alignItems: "center",
      //   margin: 10
      // }}
    >
      <BoardHeader flags={flags} reset={reset} />
      <BoardClass
        rows={rows}
        columns={columns}
        bombs={bombs}
        grid={grid}
        incrementFlags={incrementFlags}
        decrementFlags={decrementFlags}
      />
    </div>
  )
}

export default Game
