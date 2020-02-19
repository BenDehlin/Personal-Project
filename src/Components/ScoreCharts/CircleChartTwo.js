import React, { useEffect, useRef } from "react"
import withScores from "../../HOCs/withScores"
import * as d3 from "d3"
import { variables } from "../../global-styles/global-styles"

const CircleChartTwo = ({ data }) => {
  const canvas = useRef("canvas")
  useEffect(() => {
    if (data[0]) {
      drawCircleChartTwo()
    }
  }, [data])

  const drawCircleChartTwo = () => {
    const canvasHeight = 500
    const canvasWidth = 900
    const scale = 3
    const svgCanvas = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)

    svgCanvas
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr('cx', 450)
      .attr(
        "cx",
        (datapoint, iteration) => iteration % 2 === 0 ?450 + (datapoint * iteration) / scale : 450 - (datapoint * iteration) / scale
      )
      .attr('cy', 250)
      .attr('r', (datapoint) => datapoint * scale)
      // .attr('fill', (datapoint, iteration) => iteration % 2=== 0 ? variables.red : variables.blue)
      .attr('fill', (datapoint, iteration) => iteration % 2=== 0 ? 'black' : 'white')
      // .attr('stroke', 'black')
      .on('mouseover', function(datapoint, iteration){
        d3.select(this).style('fill', () => iteration % 2=== 0 ? 'white' : 'black').style('stroke', () => iteration % 2=== 0 ? 'black' : 'white')
      })
      .on('mouseout', function(datapoint, iteration){
        d3.select(this).style('fill', () => iteration % 2=== 0 ? 'black' : 'white').style('stroke', null)
      })
  }
  console.log(data)
  return (<div ref={canvas}></div>)
}

export default CircleChartTwo