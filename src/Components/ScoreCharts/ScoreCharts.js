import React, { useState } from "react"
import withScores from "../../HOCs/withScores"
import BarChart from "./BarChart"
import ChartJS from "./ChartJS"
import ChartJSDoughnut from "./ChartJSDoughnut"
import CircleChart from "./CircleChart"
import CircleChartTwo from "./CircleChartTwo"
import CircleChartThree from "./CircleChartThree"
import ChartJSScatter from "./ChartJSScatter"
import { createUseStyles } from "react-jss"
import { page } from "../../global-styles/global-styles"
import { useSpring, animated } from "react-spring"
import { variables } from "../../global-styles/global-styles"
import Button from "@material-ui/core/Button"

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
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <div className={charts}>
      {/* <div
        style={{
          position: "absolute",
          bottom: 250,
          right: 50
        }}
      >
      </div> */}
      <div
        className={chartPage}
        style={{
          justifyContent: "flex-start",
          minHeight: "90vh",
          position: "relative",
          padding: 20
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => set(flip => !flip)}
        >
          {flipped ? "Bar" : "Line"}
        </Button>
        {/* <button
          onClick={() => set(flip => !flip)}
          style={{
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: variables.red,
            fontSize: 25
            // height: 150,
            // width: 150
          }}
        >
          {flipped ? "Bar" : "Line"}
        </button> */}
        <animated.div
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform,
            display: flipped ? "none" : "flex",
            position: "absolute",
            top: 100
          }}
        >
          <ChartJS data={scores} type={"bar"} />
        </animated.div>
        <animated.div
          style={{
            opacity,
            // display: flipped ? 'flex': 'none',
            position: "absolute",
            top: 100,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`)
          }}
        >
          <ChartJS data={scores} type={"line"} />
        </animated.div>
      </div>
      {/* <div className={chartPage}></div> */}
      <div
        className={chartPage}
        style={{
          justifyContent: "flex-start",
          minHeight: "90vh",
          position: "relative",
          padding: 20
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => set(flip => !flip)}
        >
          {flipped ? "Pie" : "Doughnut"}
        </Button>
        {/* <button
          onClick={() => set(flip => !flip)}
          style={{
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: variables.red,
            fontSize: 25
            // height: 150,
            // width: 150
          }}
        >
          {flipped ? "Pie" : "Doughnut"}
        </button> */}
        <animated.div
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform,
            display: flipped ? "none" : "flex",
            position: "absolute",
            top: 100
          }}
        >
          <ChartJSDoughnut data={scores} type={"pie"} />
          {/* <ChartJS data={scores} type={"bar"} /> */}
        </animated.div>
        <animated.div
          style={{
            opacity,
            // display: flipped ? 'flex': 'none',
            position: "absolute",
            top: 100,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`)
          }}
        >
          <ChartJSDoughnut data={scores} type={"doughnut"} />
          {/* <ChartJS data={scores} type={"line"} /> */}
        </animated.div>
      </div>
      {/* <div className={chartPage}>
      </div> */}
      <div className={chartPage}>
        <ChartJSDoughnut data={scores} type={"polarArea"} />
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
