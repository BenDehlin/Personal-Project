import React from "react"
import Cell from "./Cell"

const Board = ({ grid, boardState, clickCell, incrementFlag, decrementFlag }) => {
  const {rows, columns, bombs, flags, score, gameRunning} = boardState
  // console.log(grid)
  // console.log(boardState)
  return (
    <div
      className="board"
      style={{
        height: `${columns * 10 + columns * 2}`,
        width: `${rows * 10 + rows * 2}`,
        display: "grid",
        margin: 0,
        padding: 0,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridColumnGap: 0,
        gridRowGap: 0
      }}
    >
      {grid.map((row, rowIndex) => (
        <>
          {row.map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}, ${cellIndex}`}
              cell={cell}
              clickCell={clickCell}
              incrementFlag={incrementFlag}
              decrementFlag={decrementFlag}
            />
          ))}
        </>
      ))}
    </div>
  )
}

export default Board
