// import React, { useState, useEffect } from "react"
// import BoardHeader from "../BoardHeader/BoardHeader"
// import BoardClass from "../Board/BoardClass"
// import { createUseStyles } from "react-jss"
// import { useStopwatch } from "react-timer-hook"
// import useAxios from '../../../hooks/useAxios'
// import axios from 'axios'
// import { page } from "../../../global-styles/global-styles"

// const useStyles = createUseStyles({
//   gameStyle: {
//     ...page,
//     margin: 5,
//     padding: 10,
//     marginBottom: 20
//   }
// })

// const Game = () => {
//   const { gameStyle } = useStyles()
//   const [rows, setRows] = useState(10)
//   const [columns, setColumns] = useState(10)
//   const [bombs, setBombs] = useState(25)
//   const [flags, setFlags] = useState(25)
//   const [score, setScore] = useState(0)
//   const [highScore, setHighScore] = useAxios('/api/minesweeper/score/high')
//   const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
//     autoStart: true
//   })
//   //Need to figure out making this immutable again with useRef or external library
//   let [grid, setGrid] = useState([])

//   useEffect(() => {
//     genBoard(10, 10, 25, 25)
//   }, [])

//   const genBoard = async (numRows, numColumns, numBombs, numFlags) => {
//     setRows(numRows)
//     setColumns(numColumns)
//     setBombs(numBombs)
//     setFlags(numFlags)
//     setScore(0)
//     await genGrid(numRows, numColumns)
//     await genBombs(numRows, numColumns, numBombs)
//   }

//   const genGrid = (numRows, numColumns) => {
//     grid = []
//     for (let x = 0; x < numRows; x++) {
//       grid.push([])
//       for (let y = 0; y < numColumns; y++) {
//         grid[x].push({
//           x,
//           y,
//           isBomb: false,
//           isClicked: false,
//           isFlagged: false
//         })
//       }
//     }
//     setGrid(grid)
//   }
//   const genBombs = (numRows, numColumns, numBombs) => {
//     const newGrid = [...grid]
//     for (let i = 0; i < numBombs; i++) {
//       let x = Math.floor(Math.random() * numRows)
//       let y = Math.floor(Math.random() * numColumns)
//       if(newGrid[x][y].isBomb){
//         i--
//       }else{
//         newGrid[x][y].isBomb = true
//       }
//     }
//     setGrid(newGrid)
//   }

//   const resetBoard = () => {
//     genBoard(10, 10, 25, 25)
//     reset()
//     start()
//   }

//   const incrementFlags = () => {
//     setFlags(flags + 1)
//   }
//   const decrementFlags = () => {
//     setFlags(flags - 1)
//   }

//   const submitScore = () => {
//     const time = minutes * 60 + seconds
//     axios.post('/api/minesweeper/score/new', {score, time})
//     .then(results => setHighScore(results.data))
//     .catch(err => console.log(err))
//   }

//   return (
//     <div className={gameStyle}>
//       <BoardHeader
//         flags={flags}
//         resetBoard={resetBoard}
//         minutes={minutes}
//         seconds={seconds}
//         score={score}
//         highScore={highScore}
//       />
//       <BoardClass
//         rows={rows}
//         columns={columns}
//         bombs={bombs}
//         grid={grid}
//         incrementFlags={incrementFlags}
//         decrementFlags={decrementFlags}
//         pause={pause}
//         setScore={setScore}
//         score={score}
//         submitScore={submitScore}
//       />
//     </div>
//   )
// }

// export default Game
