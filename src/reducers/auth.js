import * as actionTypes from '.././actions/actionTypes'
import _ from 'lodash'

const initialState = {
  user_name       : null,
  user_id         : null,
  isAuthenticated : false,
  error           : null,
  loading         : false,
  role            : null
}

const authStart = (state, action) => {
  return _.assign({}, state, {
    error           : null,
    loading         : true,
    isAuthenticated : false
  })
}

const authSuccess = (state, action) => {
  return _.assign({}, state, {
    user_id         : action.user_id,
    user_name       : action.user_name,
    role            : action.role,
    error           : null,
    loading         : false,
    isAuthenticated : true
  })
}

const authFail = (state, action) => {
  return _.assign({}, state, {
    error           : action.error,
    loading         : false,
    isAuthenticated : false
  })
}

const authLogOut = (state, action) => {
  return _.assign({}, state, {
    user_id         : null,
    user_name       : null,
    isAuthenticated : false
  })
}

const authValidateTokenSuccess = (state, action) => {
  return _.assign({}, state, {
    isAuthenticated : true,
    user_id         : action.user_id,
    user_name       : action.user_name
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
