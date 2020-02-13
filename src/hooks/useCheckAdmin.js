import {useEffect} from 'react'

const useCheckAdmin = (is_admin, push) => {
  useEffect(() => {
    if(!is_admin){
      push('/dashboard')
    }
  }, [is_admin, push])
}

export default useCheckAdmin