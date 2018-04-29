import * as actionTypes from '.././actions/actionTypes'
import _ from 'lodash'

const initialState = {
  token: null,
  user_id: null,
  isAuthenticated: false,
  error: null,
  loading: false
}

const authStart = (state, action) => {
  return _.assign({}, state, {
    error   : null,
    loading : false,
    isAuthenticated: false
  })
}

const authSuccess = (state, action) => {
  return _.assign({}, state, {
    token: action.token,
    user_id: action.user_id,
    error: null,
    loading: false,
    isAuthenticated: true
  })
}

const authFail = (state, action) => {
  console.log ("@@@@")
  console.log (action.error)
  return _.assign({}, state, {
    error   : action.error,
    loading : false,
    isAuthenticated: false
  })
}

const authLogOut = (state, action) => {
  return _.assign({}, state, {
    token: null,
    user_id: null,
    isAuthenticated: false
  })
}

const authReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogOut(state, action)
    default:
      return state;
  }
}

export default authReducer
