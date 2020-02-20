import React, { useState, useEffect } from "react"
import withScores from "../../HOCs/withScores"
import BarChart from "./BarChart"
import CircleChart from "./CircleChart"
import CircleChartTwo from "./CircleChartTwo"
import PieChart from "./PieChart"
import DonutChart from "./DonutChart"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"

import ChartJS from './ChartJS'

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
        <BarChart data={scores} />
      </div>
      <div className={chartPage}>
        <CircleChart data={scores} />
      </div>
      <div className={chartPage}>
        <CircleChartTwo data={scores} />
      </div>
      {/* <div className={chartPage}>
      <DonutChart data={scores} />
    </div> */}
    <div className={chartPage}>
      <ChartJS data={scores} type={type} />
      <button
      onClick={() => type === 'bar' ? setType('line') : setType('bar')}
      >{type === 'bar' ? 'See Line Graph' : 'See Bar Graph'}</button>
    </div>
      {/* <div className={chartPage}>
        <PieChart
          data={scores}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div> */}
    </div>
  )
}

export default withScores(ScoreCharts)
