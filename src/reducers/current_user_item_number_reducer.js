import * as actionTypes from '.././actions/actionTypes'

const initialState = {
  numberItems: 0,
  lastValues: []
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
        return state

      default:
        return state
    }
}

export default currentUserItemNumberReducer
