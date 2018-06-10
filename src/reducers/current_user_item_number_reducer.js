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
  console.log('CART REDUCER RECEIVED:' + JSON.stringify(action))
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

const currentUserItemNumberReducer = (state = initialState, action) => {

    switch (action.type){
      case actionTypes.ADD_ITEM_NUMBER_SUCCESS:
        state = {
          ...state,
          numberItems: state.numberItems + action.payload,
          lastValues: [...state.lastValues, state.numberItems]
        }
        return state

      case actionTypes.SUBTRACT_ITEM_NUMBER_SUCCESS:
        state = {
          ...state,
          numberItems: state.numberItems - action.payload,
          lastValues: [...state.lastValues, action.payload]
        }

      case actionTypes.GET_CART_START: return getCartStart(state, action)
      case actionTypes.GET_CART_SUCCESS: return getCartSuccess(state, action)
      case actionTypes.GET_CART_FAIL: return getCartFail(state, action)

      default:
        return state
    }
}

export default currentUserItemNumberReducer
