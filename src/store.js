import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import currentUserItemNumberReducer from './reducers/current_user_item_number_reducer'
import ReduxThunk from 'redux-thunk'

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(currentUserItemNumberReducer)

export default store
