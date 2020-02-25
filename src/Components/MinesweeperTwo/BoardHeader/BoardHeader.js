// import React from "react"
// import { createUseStyles } from "react-jss"
// import { IoIosRefreshCircle } from "react-icons/io"
// import { variables } from "../../../global-styles/global-styles"
// import { withRouter } from "react-router-dom"
// const { primary, secondary, red, blue } = variables

// const useStyles = createUseStyles({
//   header: {
//     backgroundColor: "black",
//     border: `2px solid ${secondary}`,
//     width: 500,
//     display: "flex",
//     flexFlow: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     color: "white"
//   },
//   headerSection: {
//     width: "30%",
//     display: "flex",
//     flexFlow: "column",
//     justifyContent: "space-between",
//     alignItems: "center",
//     border: '1px solid black',
//     "&:hover": { backgroundColor: "white", color: 'black' }
//   },
//   h1: {
//     margin: 10
//   },
//   icon: {
//     backgroundColor: "green",
//     borderRadius: "50%",
//     marginBottom: 10,
//     "&:hover": {
//       backgroundColor: "red"
//     }
//   }
// })

// const BoardHeader = ({
//   flags,
//   resetBoard,
//   minutes,
//   seconds,
//   score,
//   highScore,
//   history
// }) => {
//   const { header, h1, icon, headerSection } = useStyles()

//   return (
//     <div className={header}>
//       <div
//         className={headerSection}
//         onClick={() => history.push("/games/highscores/charts/minesweeper")}
//       >
//         <h3 className={h1}>High Score: {highScore.score}</h3>
//         <h3 className={h1}>SCORE: {score < 10 ? "0" + score : score}</h3>
//       </div>
//       <IoIosRefreshCircle
//         size={50}
//         className={icon}
//         onClick={() => {
//           resetBoard()
//         }}
//       />
//       <div className={headerSection}>
//         <h3 className={h1}>
//           Time: {minutes > 0 && minutes + ":"}
//           {seconds < 10 ? "0" + seconds : seconds}
//         </h3>
//         <h3 className={h1}>
//           FLAGS: {flags < 10 && flags >= 0 ? "0" + flags : flags}
//         </h3>
//       </div>
//     </div>
//   )
// }

// export default withRouter(BoardHeader)
