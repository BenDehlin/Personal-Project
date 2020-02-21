import React, {Component, createRef} from 'react'
import Chart from 'chart.js'
import axios from 'axios'

export default class ChartJSScatter extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  chartRef = createRef()
  componentDidMount(){
    const myChartRef = this.chartRef.current.getContext('2d')
    axios.get('/api/minesweeper/score/high/all').then(results => {
      const data = results.data.reduce((acc, element) => {
        acc.push({x: element.score, y: element.time})
        return acc
      }, [])
      new Chart(myChartRef, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Score/Time Scatter',
            backgroundColor: 'red',
            data,
          }]
        },
        options: {
          scales: {
            xAxes: [{
              type: 'linear',
              position: 'bottom'
            }]
          }
        }
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