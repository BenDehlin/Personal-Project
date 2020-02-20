import React, { Component, createRef } from "react"
import Chart from "chart.js"
import axios from "axios"

export default class ChartJS extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  chartRef = createRef()
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d")
    axios.get("/api/minesweeper/score/high/all").then(results => {
      const data = results.data.map(element => element.score)
      new Chart(myChartRef, {
        type: this.props.type,
        data: {
          labels: data,
          datasets: [
            {
              label: "Scores",
              data: data
            }
          ]
        },
        options: {}
      })
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.type !== this.props.type){
      const myChartRef = this.chartRef.current.getContext("2d")
      axios.get("/api/minesweeper/score/high/all").then(results => {
        const data = results.data.map(element => element.score)
        new Chart(myChartRef, {
          type: this.props.type,
          data: {
            labels: data,
            datasets: [
              {
                label: "Scores",
                data: data
              }
            ]
          },
          options: {}
        })
      })
    }
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} style={{height: 450, width: 900}} />
      </div>
    )
  }
}
