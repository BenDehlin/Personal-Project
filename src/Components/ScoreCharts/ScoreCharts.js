import React, { useState } from "react"
import withScores from "../../HOCs/withScores"
import BarChart from "./BarChart"
import ChartJS from './ChartJS'
import ChartJSDoughnut from './ChartJSDoughnut'
import CircleChart from "./CircleChart"
import CircleChartTwo from "./CircleChartTwo"
import CircleChartThree from './CircleChartThree'
import ChartJSScatter from './ChartJSScatter'
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"

const useStyles = createUseStyles({
  charts: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    paddingBottom: 20
  },
  chartPage: {
    ...page,
    width: "90vw",
    overflow: "scroll"
  }
})

const ScoreCharts = ({ data, scores }) => {
  const { charts, chartPage } = useStyles()
  const [type, setType] = useState('bar')
  return (
    <div className={charts}>
      <div className={chartPage}>
        <ChartJS data={scores} type={'bar'}/>
      </div>
      <div className={chartPage}>
        <ChartJS data={scores} type={'line'} />
      </div>
      <div className={chartPage}>
        <ChartJSDoughnut data={scores} type={'pie'} />
      </div>
      <div className={chartPage}>
        <ChartJSDoughnut data={scores} type={'doughnut'} />
      </div>
      <div className={chartPage}>
        <ChartJSDoughnut data={scores} type={'polarArea'} />
      </div>
      <div className={chartPage}>
        <ChartJSScatter />
      </div>
      <div className={chartPage}>
        <BarChart data={scores} />
      </div>
      <div className={chartPage}>
        <CircleChart data={scores} />
      </div>
      <div className={chartPage}>
        <CircleChartThree data={scores} />
      </div>
      <div className={chartPage}>
        <CircleChartTwo data={scores} />
      </div>
    </div>
  )
}

export default withScores(ScoreCharts)
