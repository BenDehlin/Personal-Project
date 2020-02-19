import React, {useState, useEffect} from 'react'
import useAxios from '../../hooks/useAxios'
import BarChartRender from '../../RenderProps/BarChartRender'
import BarChart from './BarChart'
import CircleChart from './CircleChart'
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

const ScoreCharts = (props) => {
  const {charts, chartPage} = useStyles()
  return (
    <div className={charts}>
    <div className={chartPage}>
      <BarChart />
    </div>
    <div className={chartPage}>
      <CircleChart />
    </div>
    </div>
  )
}

export default ScoreCharts