import "babel-polyfill"

import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"

//...
import createSagaMiddleware from "redux-saga"

//...
import { rootSaga, fetchStuff } from "./src/sagas"
import Counter from "./Counter"
import reducer from "./reducers"

//...
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
  )
)

//...
sagaMiddleware.run(rootSaga)

// helper fn to dispatch actions from the store
const action = type => store.dispatch({ type })

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
      onDecrement={() => action("DECREMENT")}
      fetchAppleProducts={() => action("APPLE_PRODUCTS_REQUESTED")}
    />,
    document.getElementById("root")
  )
}

render()
store.subscribe(render)
