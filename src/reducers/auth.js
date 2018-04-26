import * as actionTypes from '.././actions/actionTypes'
import _ from 'lodash'

const initialState = {
  token: null,
  user_id: null,
  error: null,
  loading: false
}

const authStart = (state, action) => {
  return _.assign({}, state, {
    error   : null,
    loading : false
  })
}

const authSuccess = (state, action) => {
  return _.assign({}, state, {
    token: action.token,
    user_id: action.user_id,
    error: null,
    loading: false
  })
}

const authFail = (state, action) => {
  return _.assign({}, state, {
    error: action.error,
    loading: false
  })
}

const authReducer = (state = initialState, action) => {
  switch (action.type){
    case actionTypes.AUTH_START: return authStart(state, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAIL: return authFail(state, action)
    default:
      return state;
  }
}

export default authReducer
