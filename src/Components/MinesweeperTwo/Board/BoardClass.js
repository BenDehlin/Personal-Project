// import React, { Component } from "react"
// import Cell from "../Cell/Cell"


// class BoardClass extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       grid: [],
//       neighbors: [
//         [1, 0],
//         [1, 1],
//         [1, -1],
//         [0, 1],
//         [0, -1],
//         [-1, 0],
//         [-1, 1],
//         [-1, -1]
//       ]
//     }
//   }

//   checkNeighbors = (x, y) => {
//     const { neighbors } = this.state
//     const { rows, columns, grid } = this.props
//     let count = 0
//     neighbors.forEach(([newX, newY]) => {
//       if (
//         x + newX >= 0 &&
//         x + newX < rows &&
//         y + newY >= 0 &&
//         y + newY < columns
//       ) {
//         if (grid[x + newX][y + newY].isBomb) {
//           count++
//         }
//       }
//     })
//     return count
//   }

//   clickCell = (x, y) => {
//     const { neighbors } = this.state
//     const { grid, rows, columns, pause, setScore, submitScore } = this.props
//     const newGrid = [...grid]
//     if (newGrid[x][y].isClicked || newGrid[x][y].isFlagged) {
//       return
//     }
//     if (newGrid[x][y].isBomb) {
//       submitScore()
//       this.revealBoard()
//       pause()
//     }else{
//       setScore((prevScore) => prevScore + 1)
//     }
//     const newCount = this.checkNeighbors(x, y)
//     newGrid[x][y].count = newCount
//     newGrid[x][y].isClicked = true
//     this.setState({ grid: newGrid }, () => {
//       if (!newGrid[x][y].isBomb && newCount === 0) {
//         neighbors.forEach(([newX, newY]) => {
//           if (
//             x + newX >= 0 &&
//             x + newX < rows &&
//             y + newY >= 0 &&
//             y + newY < columns
//           ) {
//             this.clickCell(x + newX, y + newY)
//           }
//         })
//       }
//     })
//   }

//   flagCell = (x, y, e) => {
//     e.preventDefault()
//     const { grid, incrementFlags, decrementFlags } = this.props
//     const newGrid = [...grid]
//     if (newGrid[x][y].isClicked) {
//       return
//     }
//     if (!newGrid[x][y].isFlagged) {
//       decrementFlags()
//     } else {
//       incrementFlags()
//     }
//     newGrid[x][y].isFlagged = !newGrid[x][y].isFlagged
//     this.setState({ grid: newGrid })
//   }

//   revealBoard = () => {
//     const { grid } = this.props
//     grid.forEach((row, rowIndex) => {
//       row.forEach((column, columnIndex) => {
//         grid[rowIndex][columnIndex].isClicked = true
//       })
//     })
//   }

//   render() {
//     const { grid, rows, columns } = this.props
//     return (
//       <div
//         style={{
//           height: `${columns * 10 + columns * 2}`,
//           width: `${rows * 10 + rows * 2}`,
//           display: "grid",
//           margin: 0,
//           padding: 0,
//           gridTemplateRows: `repeat(${rows}, 1fr)`,
//           gridTemplateColumns: `repeat(${columns}, 1fr)`,
//           gridColumnGap: 0,
//           gridRowGap: 0
//         }}
//       >
//         {grid.map((row, rowIndex) => {
//           return (
//             <>
//               {row.map((cell, cellIndex) => {
//                 return (
//                   <Cell
//                     key={`${rowIndex}, ${cellIndex}`}
//                     cell={cell}
//                     clickCell={this.clickCell}
//                     flagCell={this.flagCell}
//                   />
//                 )
//               })}
//             </>
//           )
//         })}
//       </div>
//     )
//   }
// }

// export default BoardClass
