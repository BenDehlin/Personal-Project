// import React, { useState, useEffect } from "react"
// import { FaBomb } from "react-icons/fa"
// import { MdFlag } from "react-icons/md"
// import { createUseStyles } from "react-jss"
// import {variables} from '../../../global-styles/global-styles'
// const {primary, secondary, red, blue} = variables

// const useStyles = createUseStyles({
//   cellStyle: {
//     height: 50,
//     width: 50,
//     backgroundColor: primary,
//     border: `1px solid ${secondary}`,
//     "&:hover": {
//       backgroundColor: "green"
//     }
//   }
// })

// const Cell = ({ cell, clickCell, flagCell }) => {
//   const { cellStyle } = useStyles()
//   const { x, y, isBomb } = cell
//   const [count, setCount] = useState(0)
//   const [isClicked, setIsClicked] = useState(false)
//   const [isFlagged, setIsFlagged] = useState(false)

//   useEffect(() => {
//     setCount(cell.count)
//     setIsClicked(cell.isClicked)
//     setIsFlagged(cell.isFlagged)
//   }, [cell.count, cell.isClicked, cell.isFlagged])

//   return (
//     <div
//       className={cellStyle}
//       style={{
//         backgroundColor: isClicked && "green"
//       }}
//       onContextMenu={e => flagCell(x, y, e)}
//       onClick={() => clickCell(x, y)}
//     >
//       <div
//         // className={cellStyle}
//         style={{
//           height: "100%",
//           width: "100%",
//           backgroundColor: isFlagged && 'blue',
//           // backgroundColor: isClicked && isBomb && 'red',
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             width: "100%",
//             // backgroundColor: isFlagged && "blue",
//             backgroundColor: isClicked && isBomb && 'red',
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//           }}
//         >
//           {isFlagged && <MdFlag size={30} />}
//           {isClicked && isBomb && <FaBomb size={25} />}
//           {isClicked && !isBomb && count}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cell
