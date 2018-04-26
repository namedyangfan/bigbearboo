import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return{
    type : actionTypes.AUTH_START,
  }
}

export const authSuccess = (token, user_id) => {
  return{
    type    : actionTypes.AUTH_SUCCESS,
    token   : token,
    user_id : user_id
  }
}

export const authFail = (error) => {
  return{
    type : actionTypes.AUTH_FAIL,
    error: error.response.data.error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())

    axios.post(`${process.env.PUBLIC_URL}auth/login`, {
      email    : email,
      password : password
    })
    .then( response => {
      dispatch(authSuccess(response.data.token, response.data.user_id));
    })
    .catch( error => {
      dispatch(authFail(error))
    })

  }

}
