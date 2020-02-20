import React from "react"
import * as d3 from "d3"
import useChart from '../../hooks/useChart'

const CircleChartTwo = ({ data }) => {
  const [canvas] = useChart(data, drawChart)
  function drawChart(){
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
    .attr("cx", 450)
    .attr("cx", (datapoint, iteration) =>
    iteration % 2 === 0
    ? 450 + (datapoint * iteration) / Math.PI
    : 450 - (datapoint * iteration) / Math.PI
    )
    .attr("cy", 250)
    .attr("r", datapoint => datapoint * scale)
    .attr("fill", (datapoint, iteration) =>
    iteration % 2 === 0 ? "black" : "white"
    )
    .on("mouseover", function(datapoint, iteration) {
      d3.select(this)
      .style("fill", () => (iteration % 2 === 0 ? "white" : "black"))
      .style("stroke", () => (iteration % 2 === 0 ? "black" : "white"))
      
      svgCanvas
      .append("text")
      .attr("x", 100)
      .attr("y", 250)
      .text(datapoint)
    })
    .on("mouseout", function(datapoint, iteration) {
      d3.select(this)
      .style("fill", () => (iteration % 2 === 0 ? "black" : "white"))
      .style("stroke", null)
      svgCanvas.selectAll("text").remove()
    })
    
    svgCanvas
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", 100)
    .attr("y", 250)
    .attr("display", "none")
    .text(datapoint => datapoint)
  }
  return <div ref={canvas}></div>
}

export default CircleChartTwo
