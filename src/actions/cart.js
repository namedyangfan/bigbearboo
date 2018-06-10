import * as actionTypes from 'actions/actionTypes'
import * as CartOrdersApi from 'api/cart_orders'

export const addItemNumberSuccess = (number) => {
  return {
    type    : actionTypes.ADD_ITEM_NUMBER_SUCCESS,
    payload : number
  }
}

export const addItemNumber = (number) => {
  return (dispatch) => {
    setTimeout( () => {
    dispatch(addItemNumberSuccess(number))
    }, 2000)
  }
}

export const currentUseItemNumberSubtract = (number) =>{
  return {
    type    : actionTypes.SUBTRACT_ITEM_NUMBER_SUCCESS,
    payload : number
  }
}

export const getCartStart = () => {
  return{
    type: actionTypes.GET_CART_START,
  }
}

export const getCartSuccess = (numberItems) => {
  return{
    type        : actionTypes.GET_CART_SUCCESS,
    numberItems : numberItems
  }
}

export const getCartFail = (error) => {
  return{
    type : actionTypes.GET_CART_FAIL,
    error: error.response.data.error
  }
}

export const getCart = () => {
  console.log('GETCART dispatch')
  return dispatch => {
    dispatch(getCartStart())

    const params = {
      user_id : localStorage.getItem('user_id'),
      token   : localStorage.getItem('token')
    }

    CartOrdersApi.show(params)
    .then( response => {
      dispatch(getCartSuccess(response.data.order_items.length))
    })
    .catch((error) => {
      console.log(error.response.data.errors)
      dispatch(getCartFail(error))
    })
  }
}