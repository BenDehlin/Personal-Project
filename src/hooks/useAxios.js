import {useState, useEffect} from 'react'
import axios from 'axios'

const useAxios = (url) => {
  console.log('hit useAxios')
  const [axiosData, setAxiosData] = useState([])
  useEffect(() => {
    axios.get(url)
    .then(results => setAxiosData(results.data))
    .catch(err => console.log(err))
  }, [url])
  return [axiosData, setAxiosData]
}

export default useAxios