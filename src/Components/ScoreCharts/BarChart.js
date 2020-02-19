import React, { useEffect, useRef } from "react"
import withScores from "../../HOCs/withScores"
import * as d3 from "d3"
import { variables } from "../../global-styles/global-styles"
import {createUseStyles} from 'react-jss'
import './BarChart.css'

// const useStyles = createUseStyles({
//   barStyle: {
//     border: '1px solid black',
//     '&:hover':{
//       boxShadow: `.6em .6em .6em ${variables.primary}`
//     }
//   }
// })

const BarChart = ({ data }) => {
  // const {barStyle} = useStyles()
  const canvas = useRef("canvas")
  useEffect(() => {
    if (data[0]) {
      drawBarChart()
    }
  }, [data])

  const drawBarChart = () => {
    // draw blank svg
    const canvasHeight = 500
    const canvasWidth = 900
    const scale = 5
    const barWidth = 30
    const svgCanvas = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)

    //draw bars
    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", barWidth)
      .attr("height", datapoint => datapoint * scale)
      .attr("stroke", (datapoint, iteration) => iteration % 2 === 0 ? variables.red : variables.blue)
      .attr("fill", 'black')
      .attr("x", (datapoint, iteration) => iteration * (barWidth + 5))
      .attr("y", datapoint => canvasHeight - datapoint * scale)
      .on('mouseover', function(datapoint, iteration){
        d3.select(this).style('fill', () => iteration % 2 === 0 ? variables.red : variables.blue).style('stroke', 'black')
      })
      .on('mouseout', function(datapoint, iteration){
        d3.select(this).style('fill', 'black').style('stroke', () => iteration % 2 === 0 ? variables.red : variables.blue)
      })

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (datapoint, iteration) => iteration * (barWidth + 5) + 10)
      .attr(
        "y",
        (datapoint, iteration) => canvasHeight - datapoint * scale - 10
      )
      .text(datapoint => datapoint)
  }
  return <div ref={canvas}></div>
}

export default withScores(BarChart)
