import {useEffect} from 'react'

const useCheckUser = (user, push) => {
  useEffect(() => {
    if(!user.id){
      push('/login')
    }
  }, [])
}

export default useCheckUser