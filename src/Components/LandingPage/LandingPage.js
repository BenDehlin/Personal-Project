import React, {useEffect} from 'react'
import {connect} from 'react-redux'

const LandingPage = ({user, history}) => {
  useEffect(() => {
    if(user && user.id){
      history.push('/dashboard')
    }else{
      history.push('/login')
    }
  }, [user.id, history])
  return (<div>Landing Page</div>)
}

const mapStateToProps = (state) => {
  const {user} = state.authReducer
  return {user}
}

export default connect(mapStateToProps)(LandingPage)