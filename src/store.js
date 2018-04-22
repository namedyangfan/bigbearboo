import {createStore, combineReducers, applyMiddleware} from "redux"
import logger from 'redux-logger'
import currentUserItemNumberReducer from "./reducers/current_user_item_number_reducer"

export default createStore(
    currentUserItemNumberReducer,
    applyMiddleware(logger)
)
