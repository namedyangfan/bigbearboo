import _ from 'lodash'
import * as actionTypes from 'actions/actionTypes'

const initialState = {
  numberItems : 0,
  loading     : false,
  error       : null
}

const getCartStart = (state, action) => {
  return _.assign({}, state, {
    error           : null,
    loading         : true,
  })
}

const getCartSuccess = (state, action) => {
  return _.assign({}, state, {
    error       : null,
    loading     : false,
    numberItems : action.numberItems
  })
}

const getCartFail = (state, action) => {
  return _.assign({}, state, {
    error       : action.error,
    loading     : false,
  })
}

const addItemStart = (state, action) => {
  return _.assign({}, state, {
    error           : null,
    loading         : true,
  })
}

const addItemSuccess = (state, action) => {
  return _.assign({}, state, {
    error       : null,
    loading     : false,
    numberItems : action.numberItems
  })
}

const addItemFail = (state, action) => {
  return _.assign({}, state, {
    error       : action.error,
    loading     : false,
  })
}

const currentUserItemNumberReducer = (state = initialState, action) => {

    switch (action.type){
      case actionTypes.GET_CART_START: return getCartStart(state, action)
      case actionTypes.GET_CART_SUCCESS: return getCartSuccess(state, action)
      case actionTypes.GET_CART_FAIL: return getCartFail(state, action)
      case actionTypes.ADD_ITEM_START: return addItemStart(state, action)
      case actionTypes.ADD_ITEM_SUCCESS: return addItemSuccess(state, action)
      case actionTypes.ADD_ITEM_FAIL: return addItemFail(state, action)

      default:
        return state
    }
}

export default currentUserItemNumberReducer
