// import React from "react"
// import * as d3 from "d3"
// import { variables } from "../../global-styles/global-styles"
// import useChart from "../../hooks/useChart"

// const DonutChart = ({ data }) => {
//   const [canvas] = useChart(data, drawChart)
//   function drawChart() {
//     const scores = data.map(element => element.score)
//     const canvasHeight = 500
//     const canvasWidth = 500
//     const margin = 50
//     const radius = Math.min(canvasWidth, canvasHeight) / 2 - margin
//     // const scale = 3
//     const svgCanvas = d3
//       .select(canvas.current)
//       .append("svg")
//       .attr("width", canvasWidth)
//       .attr("height", canvasHeight)
//       .append("g")
//       .attr(
//         "transform",
//         "translate(" + canvasWidth / 2 + "," + canvasHeight / 2 + ")"
//       )

//     const color = d3
//       .scaleOrdinal()
//       .domain(scores)
//       .range(d3.schemeDark2)

//     const pie = d3
//       .pie()
//       .value(d => d)
//     const data_ready = pie(d3.entries(data))
//     const arc = d3
//       .arc()
//       .innerRadius(radius * 0.9)
//       .outerRadius(radius * 0.9)

//     // const outerArc = d3
//     //   .arc()
//     //   .innerRadius(radius * 0.9)
//     //   .outerRadius(radius * 0.9)

//     svgCanvas
//       .selectAll("whatever")
//       .data(data_ready)
//       .enter()
//       .append("path")
//       .attr("d", d3.arc().innerRadius(100).outerRadius(radius))
//       .attr("fill", 'black')
//       .attr("stroke", "white")
//       .style("stroke-width", "2px")
//       .style("opacity", 0.7)
//     console.log(data)
//   }
//   return <div ref={canvas}></div>
// }

// export default DonutChart
