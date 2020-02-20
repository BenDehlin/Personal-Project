import React from "react"
import * as d3 from "d3"
import { variables } from "../../global-styles/global-styles"
import useChart from "../../hooks/useChart"

const BarChart = ({ data }) => {
  const [canvas] = useChart(data, drawChart)
  function drawChart() {
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
      .attr("stroke", 'black')
      .attr("fill", 'blue')
      .attr("x", (datapoint, iteration) => iteration * (barWidth + 5))
      .attr("y", datapoint => canvasHeight - datapoint * scale)
      .on("mouseover", function(datapoint, iteration) {
        d3.select(this)
          .style("fill", 'red')
          .style("stroke", "black")
      })
      .on("mouseout", function(datapoint, iteration) {
        d3.select(this)
          .style("fill", "blue")
          .style("stroke", 'black')
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

export default BarChart
