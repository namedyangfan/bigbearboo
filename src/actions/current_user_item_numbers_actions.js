export function currentUseItemNumberAdd(number){
  return {
    type: "CURRENT_USER_ADD_ITEM_NUMBER",
    payload: number
  }
}

export function currentUseItemNumberSubtract(number){
  return {
    type: "CURRENT_USER_SUBTRACT_ITEM_NUMBER",
    payload: number
  }
}
