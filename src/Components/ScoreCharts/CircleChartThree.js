import React from "react"
import * as d3 from "d3"
import { variables } from "../../global-styles/global-styles"
import useChart from '../../hooks/useChart'

const CircleChart = ({ data }) => {
  const [canvas] = useChart(data, drawChart)
  function drawChart(){
    // draw blank svg
    const canvasHeight = 500
    const canvasWidth = 900
    const scale = 3
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
      .attr("cx", (datapoint, iteration) =>
        iteration % 2 === 0 ? 450 + 15 * scale : 450 - 15 * scale
      )
      .attr("cy", 250)
      .attr("r", datapoint => datapoint * scale)
      .attr("stroke", (datapoint, iteration) =>
        iteration % 2 === 0 ? variables.red : variables.blue
      )
      .attr("id", (datapoint, iteration) => iteration)
      .on("mouseover", function(datapoint, iteration) {
        d3.select(this).style("fill", () =>
          iteration % 2 === 0 ? variables.blue : variables.red
        )
        svgCanvas
          .append("text")
          .attr("x", 100)
          .attr("y", 250)
          .text(datapoint)
      })
      .on("mouseout", function(datapoint) {
        d3.select(this)
          .style("fill", "black")
          .text(datapoint => datapoint)
        svgCanvas.selectAll("text").remove()
      })
  }
  return <div ref={canvas}></div>
}

export default CircleChart
