import React, { useEffect, useRef } from "react"
import withScores from "../../HOCs/withScores"
import * as d3 from "d3"
import { variables } from "../../global-styles/global-styles"

const CircleChart = ({ data }) => {
  const canvas = useRef("canvas")
  useEffect(() => {
    if (data[0]) {
      drawCircleChart()
    }
  }, [data])

  const drawCircleChart = () => {
    // draw blank svg
    const canvasHeight = 500
    const canvasWidth = 900
    const scale = 3
    const barWidth = 30
    const svgCanvas = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)

    //draw bars
    svgCanvas
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      // .attr("cx", 450)
      .attr("cx", (datapoint, iteration) => iteration % 2 === 0 ? 450 + (15 * scale) : 450 - (15 * scale))
      // .attr("cx", (datapoint, iteration) => 450 + ( datapoint * iteration)/scale)
      .attr("cy", 250)
      .attr("r", (datapoint) => datapoint * scale)
      .attr('stroke', (datapoint, iteration) => iteration % 2 === 0 ? variables.red : variables.blue)
      .attr('id', (datapoint, iteration) => iteration)
      .on("mouseover", function(datapoint, iteration) {
        d3.select(this).style("fill", () => iteration % 2 === 0 ? variables.blue : variables.red);
      })
      .on('mouseout', function(datapoint){
        d3.select(this).style('fill', 'black').text(datapoint => datapoint)
      })    
      // .on('mouseout', () => {
      //   d3.select(this).style('fill', 'black')
      // })
      // .attr('fill', (datapoint, iteration) => (iteration + 1) % 2 === 0 ? 'white' : 'black')
  }
  return <div ref={canvas}></div>
}

export default withScores(CircleChart)
