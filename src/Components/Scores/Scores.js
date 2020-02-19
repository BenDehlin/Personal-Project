import React from "react"
import useAxios from "../../hooks/useAxios"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"

const useStyles = createUseStyles({
  scorePage: {
    ...page,
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridTemplateRows: "repeat(25, 1fr)",
    gridColumnGap: 0,
    gridRowGap: 0,
    padding: 20,
    marginBottom: 20
  },
  scoreStyle: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: 0,
    gridRowGap: 0,
    border: "1px solid black",
    "&:hover": {
      backgroundColor: "white",
      color: "black"
    },
    margin: 10,
    padding: 10,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10
  }
})

const Scores = props => {
  const { scorePage, scoreStyle } = useStyles()
  const [minesweeperHighScores] = useAxios("/api/minesweeper/score/high/all")
  return (
    <div className={scorePage}>
      {minesweeperHighScores &&
        minesweeperHighScores.map((element, index) => {
          const { id, username, score, time } = element
          return (
            <div key={id} className={scoreStyle}>
              <p>{index + 1}</p>
              <p>User: {username}</p>
              <p>Score: {score}</p>
              <p>Time: {time}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Scores
