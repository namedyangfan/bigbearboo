import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import currentUserItemNumberReducer from './reducers/current_user_item_number_reducer'
import authReducer from './reducers/auth'
import ReduxThunk from 'redux-thunk'

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const rootReducer = combineReducers({
  auth: authReducer,
  itemNumber: currentUserItemNumberReducer
})

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer)

export default store
