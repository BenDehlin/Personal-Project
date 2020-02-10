import axios from "axios"
import actionTypes from "./actionTypes"

const {
  SET_USER,
  GET_USER,
  
  PENDING,
  FULFILLED,
  REJECTED
} = actionTypes

const initialState = {
  user: {
    id: "",
    username: "",
    first: "",
    last: "",
    email: "",
    img: "",
    age: ""
  },
  loading: false,
  errorMessage: ''
}

export function setUser(payload) {
  return{type: SET_USER, payload}
}

export function getUser() {
  const payload = axios
    .get("/auth/user")
    .then(results => {
      return results.data
    })
    .catch(err => console.log(err))
  return {
    type: GET_USER,
    payload
  }
}

export default function authReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    //SET USER
    case SET_USER:
      return {...state, user: payload}
    //GET_USER
    case GET_USER + PENDING:
      return { ...state, loading: true, errorMessage: "" }
    case GET_USER + FULFILLED:
      return { ...state, user: payload, loading: false, errorMessage: "" }
    case GET_USER + REJECTED:
      return { ...state, loading: false, errorMessage: payload }
    default:
      return state
  }
}
