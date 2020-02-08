import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useAxios = (url, method = 'get', body = null, initialData) => {
  console.log('hit')
  const [axiosData, setAxiosData] = useState(initialData)
  useEffect(() => {
    axios(url, {method, body})
    .then(results => setAxiosData(results.data))
    .catch(err => console.log(err))
  }, [url, method, body])
  return [axiosData, setAxiosData]
}

export default useAxios