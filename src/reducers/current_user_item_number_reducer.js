const currentUserItemNumberReducer = (state =
  {
  numberItems: 1,
  testtest: 'asdasd',
  lastValues: []
  }, action) => {
    switch (action.type){
      case "CURRENT_USER_ADD_ITEM_NUMBER":
        state = {
          ...state,
          numberItems: state.numberItems + action.payload,
          lastValues: [...state.lastValues, action.payload]
        }
        break
      case "CURRENT_USER_SUBTRACT_ITEM_NUMBER":
        state = {
          ...state,
          numberItems: state.numberItems - action.payload,
          lastValues: [...state.lastValues, action.payload]
        }
        break
    }
    return state
}

export default currentUserItemNumberReducer
