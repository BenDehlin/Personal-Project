import React, {useState, useEffect} from 'react'
import withScores from "../../HOCs/withScores"
import BarChart from './BarChart'
import CircleChart from './CircleChart'
import CircleChartTwo from './CircleChartTwo'
import {createUseStyles} from 'react-jss'
import {page} from '../../global-styles/global-styles'

const useStyles = createUseStyles({
  charts: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingBottom: 20
  },
  chartPage: {
    ...page,
    width: '90vw',
    overflow: 'scroll'
  }
})

const ScoreCharts = ({data}) => {
  const {charts, chartPage} = useStyles()
  return (
    <div className={charts}>
    <div className={chartPage}>
      <BarChart data={data} />
    </div>
    <div className={chartPage}>
      <CircleChart data={data} />
    </div>
    <div className={chartPage}>
      <CircleChartTwo data={data} />
    </div>
    </div>
  )
}

export default withScores(ScoreCharts)