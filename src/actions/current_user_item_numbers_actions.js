export const ADD_ITEM_NUMBER_SUCCESS = 'ADD_ITEM_NUMBER_SUCCESS'
export const SUBTRACT_ITEM_NUMBER_SUCCESS = 'SUBTRACT_ITEM_NUMBER_SUCCESS'

export const addItemNumberSuccess = (number) => {
  return {
    type: ADD_ITEM_NUMBER_SUCCESS,
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
    type: SUBTRACT_ITEM_NUMBER_SUCCESS,
    payload: number
  }
}


