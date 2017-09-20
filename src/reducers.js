import { combineReducers } from 'redux'

export function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "INCREMENT_IF_ODD":
      return state % 2 !== 0 ? state + 1 : state;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

export function appleProductsReducer(state = {}, action){
  switch (action.type) {
    case 'APPLE_PRODUCTS_RECEIVED':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default combineReducers({
  counter,
  appleProducts: appleProductsReducer,
})
