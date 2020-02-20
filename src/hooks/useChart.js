import {useRef, useEffect} from 'react'

const useChart = (data, drawChart) => {
  const canvas = useRef("canvas")
  useEffect(() => {
    if (data[0]) {
      drawChart()
    }
  }, [data])
  return [canvas]
}

export default useChart