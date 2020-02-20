import React, { Component, createRef } from "react"
import Chart from "chart.js"
import axios from "axios"
import randomColor from "randomcolor"

export default class ChartJSDoughnut extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  chartRef = createRef()
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d")
    axios.get("/api/minesweeper/score/high/all").then(results => {
      const top = Math.floor(results.data.reduce((acc, element) => {
        if(element.score / 10 > acc){
          acc = element.score / 10
        }
        return acc
      }, 0)) + 1
      const [data, labels, colors] = results.data.reduce(
        (acc, element) => {
          for (let i = top - 1; i >= 0; i--) {
            if (!acc[1][i]) {
              let lowerBound = i * 10
              let upperBound = (i + 1) * 10
              acc[1][i] = `Between ${lowerBound} and ${upperBound}`
              acc[2][i] = randomColor({ luminosity: "dark" })
            }
            if (element.score > i * 10 && element.score <= (i + 1) * 10) {
              acc[0][i]++
            }
          }
          return acc
        },
        [
          Array.from(Array(top), () => 0),
          Array.from(Array(top), () => null),
          Array.from(Array(top), () => null)
        ]
      )
      new Chart(myChartRef, {
        type: this.props.type,
        data: {
          labels,
          datasets: [
            {
              label: "Score",
              data,
              backgroundColor: colors,
              // backgroundColor: [
              //   "red",
              //   "blue",
              //   "green",
              //   "purple",
              //   "yellow",
              //   "orange",
              //   "black",
              //   "teal"
              // ],
              borderColor: "black"
            }
          ]
        },
        options: {}
      })
    })
  }

  render() {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
          style={{ height: 450, width: 900 }}
        />
      </div>
    )
  }
}
