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

export const authLogOut = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
  return{
    type : actionTypes.AUTH_LOGOUT,
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
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user_id', response.data.user_id)
      dispatch(authSuccess(response.data.token, response.data.user_id))
    })
    .catch( error => {
      dispatch(authFail(error))
    })
  }
}

export const authValidateTokenSuccess = (token, user_id) => {
  return{
    type    : actionTypes.AUTH_VALIDATETOKEN_SUCCESS,
  }
}

export const authValidateToken = () => {

  return dispatch => {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')

    if (!token || !user_id){
      dispatch(authLogOut())
      console.log("Action authValidateToken: token or user_id not found")

    } else {
        dispatch(authStart())
        //TODO: change the api and add header
        console.log("authValidateToken start")
        axios.get(`${process.env.PUBLIC_URL}auth/authenticate`, {
          params: {
            user_id : user_id,
            token   : token
          }
        })
        .then( response => {
          console.log("authValidateToken success")
          dispatch(authSuccess(response.data.token, response.data.user_id))
        })
        .catch( error => {
          console.log("authValidateToken faild")
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          dispatch(authLogOut())
        })
      }
  }
}
