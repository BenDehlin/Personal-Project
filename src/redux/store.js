import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import authReducer from './authReducer'
import forumReducer from './forumReducer'

const rootReducer = combineReducers({
  authReducer, forumReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))