import React from 'react'
import useAxios from '../hooks/useAxios'

const withScores = WrappedComponent => {
  return function WithScores(props){
    const [data] = useAxios("/api/minesweeper/score/high/all")
    const scores = data.map(element => {
      return element.score
    })
    return (
      <WrappedComponent data={data} scores={scores} {...props} />
    )
  }
}
export default withScores