import actionTypes from "./actionTypes"

const { SET_FORUM } = actionTypes

const initialState = {
  forum_id: 0
}

export function setForum(payload) {
  return { type: SET_FORUM, payload }
}

export default function forumReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_FORUM:
      return { ...state, forum_id: payload }
    default:
      return state
  }
}
