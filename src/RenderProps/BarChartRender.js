// import React from "react"
// //DEPRECATED

// const BarChartDisplay = ({ data }) => {
//   useEffect(() => {
//     drawBarChart()
//   }, [])

//   const drawBarChart = () => {
//     const canvasHeight = 500
//     const canvasWidth = 500
//     const scale = 20
//     const barWidth = 15
//     const svgCanvas = d3
//       .select(canvas.current)
//       .append("svg")
//       .attr("width", canvasWidth)
//       .attr("height", canvasWidth)
//       .style("border", "1px solid black")

//     svgCanvas
//       .selectAll("rect")
//       .data(data)
//       .enter()
//       .append("rect")
//       .attr("width", barWidth)
//       .attr("height", datapoint => datapoint * 20)
//       .attr("fill", "red")
//       .attr("x", (datapoint, iteration) => iteration * (barWidth + 5))
//       .attr("y", datapoint => canvasHeight - datapoint * scale)

//     svgCanvas
//       .selectAll("text")
//       .data(data)
//       .enter()
//       .append("text")
//       .attr("x", (datapoint, iteration) => iteration * (barWidth + 5) + 10)
//       .attr(
//         "y",
//         (datapoint, iteration) => canvasHeight - datapoint * scale - 10
//       )
//       .text(datapoint => datapoint)

//     return <div ref={canvas}></div>
//   }
// }

// export default BarChartDisplay
