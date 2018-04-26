import * as actionTypes from './actionTypes'

export const addItemNumberSuccess = (number) => {
  return {
    type: actionTypes.ADD_ITEM_NUMBER_SUCCESS,
    payload: number
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
    type: actionTypes.SUBTRACT_ITEM_NUMBER_SUCCESS,
    payload: number
  }
}


