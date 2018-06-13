import * as actionTypes from 'actions/actionTypes'
import * as CartOrdersApi from 'api/cart_orders'
import * as CartOrderItemsApi from 'api/cart_order_items'
import _ from 'lodash'

export const removeItemStart = () => {
  return{
    type: actionTypes.REMOVE_ITEM_START,
  }
}

export const removeItemSuccess = (numberItems) => {
  return{
    type: actionTypes.REMOVE_ITEM_SUCCESS,
    numberItems : numberItems
  }
}

export const removeItemFail = (error) => {
  return{
    type: actionTypes.REMOVE_ITEM_FAIL,
    error: error.response.data.error
  }
}

export const removeItem = (itemParams) => {
  return dispatch => {
    dispatch(addItemStart())

    const authParams = {
      user_id : localStorage.getItem('user_id'),
      token   : localStorage.getItem('token')
    }

    const params = _.assign({}, itemParams, authParams)
    console.log('REMOVEITEM PARAM:' + JSON.stringify(params))
    CartOrderItemsApi.destroy(params)
    .then( response => {
      dispatch(removeItemSuccess(response.data.length))
    })
    .catch((error) => {
      dispatch(removeItemFail(error))
    })
  }
}

export const addItemStart = () => {
  return{
    type: actionTypes.ADD_ITEM_START,
  }
}

export const addItemSuccess = (numberItems) => {
  return{
    type: actionTypes.ADD_ITEM_SUCCESS,
    numberItems : numberItems
  }
}

export const addItemFail = (error) => {
  return{
    type: actionTypes.ADD_ITEM_FAIL,
    error: error.response.data.error
  }
}

export const addItem = (itemParams) => {
  return dispatch => {
    dispatch(addItemStart())

    const authParams = {
      user_id : localStorage.getItem('user_id'),
      token   : localStorage.getItem('token')
    }

    const params = _.assign({}, itemParams, authParams)
    console.log('ADDITEM PARAM:' + JSON.stringify(params))
    CartOrderItemsApi.post(params)
    .then( response => {
      dispatch(addItemSuccess(response.data.length))
    })
    .catch((error) => {
      dispatch(addItemFail(error))
    })
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