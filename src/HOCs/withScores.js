import React from 'react'
import useAxios from '../hooks/useAxios'

const withScores = WrappedComponent => {
  return function WithScores(props){
    const [data] = useAxios("/api/minesweeper/score/high/all")
    console.log(data)
    const scores = data.map(element => {
      return element.score
    })
    console.log(scores)
    return (
      <WrappedComponent data={scores} {...props} />
    )
  }
}
export default withScores