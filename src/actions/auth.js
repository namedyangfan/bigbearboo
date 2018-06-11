import * as actionTypes from './actionTypes'
import axios from 'axios'
import * as CartActions from 'actions/cart'

export const authStart = () => {
  return{
    type : actionTypes.AUTH_START,
  }
}

export const authSuccess = (user_id, user_name) => {
  return{
    type      : actionTypes.AUTH_SUCCESS,
    user_id   : user_id,
    user_name : user_name
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
      dispatch(authSuccess(response.data.user_id,
                           response.data.user_name
                           ))
      dispatch(CartActions.getCart())
    })
    .catch( error => {
      dispatch(authFail(error))
    })
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
        console.log("authValidateToken start")
        axios.get(`${process.env.PUBLIC_URL}auth/authenticate`, {
          params: {
            user_id : user_id,
            token   : token
          }
        })
        .then( response => {
          console.log("authValidateToken success")
          dispatch(authSuccess(response.data.user_id,
                               response.data.user_name
                              ))
          dispatch(CartActions.getCart())
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
