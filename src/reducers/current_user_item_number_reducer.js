import * as itemNumberActions from '.././actions/current_user_item_numbers_actions'

const currentUserItemNumberReducer = (state =
  {
  numberItems: 0,
  testtest: 'asdasd',
  lastValues: []
  }, action) => {
    switch (action.type){
      case itemNumberActions.ADD_ITEM_NUMBER_SUCCESS:
        state = {
          ...state,
          numberItems: state.numberItems + action.payload,
          lastValues: [...state.lastValues, state.numberItems]
        }
        break
      case itemNumberActions.SUBTRACT_ITEM_NUMBER_SUCCESS:
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
