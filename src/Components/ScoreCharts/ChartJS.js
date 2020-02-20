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
      const scores = results.data.map(element => element.score)
      const colors = results.data.map((element, index) => index % 2 === 0 ? 'red': 'blue')
      const times = results.data.map(element => element.time)
      new Chart(myChartRef, {
        type: this.props.type,
        data: {
          labels: scores,
          datasets: [
            {
              label: "Score",
              data: scores,
              backgroundColor: 'red',
              borderColor: 'black',
            },
            {
              label: "Time",
              data: times,
              backgroundColor: 'blue',
              borderColor: 'black',
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
                data: data,
                backgroundColor: 'blue',
                borderColor: 'green'
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
