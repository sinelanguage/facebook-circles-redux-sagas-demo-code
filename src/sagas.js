import { delay } from "redux-saga"
import { put, takeEvery, all, call } from "redux-saga/effects"

// This is our first generator function itself.

export function* helloSaga() {
  console.log("Hello Sagas!")
}

// 1. This worker saga will perform the async increment task
// incrementAsync Saga sleeps for 1 second via the call to delay(1000), then dispatches an INCREMENT action.
export function* incrementAsync() {
  
  // this function blocks the Generator.
  // delay is a util fn that returns a prom
  yield delay(1000)

  // put is one example of what we call an Effect. Effects are simple JavaScript objects which contain instructions to be fulfilled by the middleware. When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.

  // In redux-saga, Sagas are implemented using Generator functions. To express the Saga logic we yield plain JavaScript Objects from the Generator. We call those Objects Effects. An Effect is simply an object which contains some information to be interpreted by the middleware. You can view Effects like instructions to the middleware to perform some operation (invoke some asynchronous function, dispatch an action to the store).

  // To create Effects, you use the functions provided by the library in the redux-saga/effects package.
  yield put({ type: "INCREMENT" })
}

// 2. This watcher will spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  // takeEvery is a redux-saga helper function that allows concurrent instances of incrementAsync to be invoked with no regard for when each one returns.
  yield takeEvery("INCREMENT_ASYNC", incrementAsync)
}

// To summarize, the incrementAsync Saga sleeps for 1 second via the call to delay(1000), then dispatches an INCREMENT action.

// Next, we created another Saga watchIncrementAsync. We use takeEvery, a helper function provided by redux-saga, to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.

// Example of a saga fetching data from an API

/*
function* fetchProducts(dispatch) {
  const APPLE_PRODUCTS = yield fetch('../src/server/mock-data.json');
  dispatch({ type: 'APPLE_PRODUCTS_RECEIVED', APPLE_PRODUCTS })
}
*/

export function* fetchAppleProductsAsync() {
  try {
    // fetching Apple products
    console.log("fetching Apple Products")

    // call can take an function that returns a promise OR another generator fn
    const response = yield call(fetch, "../src/server/mock-data.json")

    // response from mock API
    console.log("response: ", response)

    // Read the data stream
    const APPLE_PRODUCTS = yield response.json()
    console.log("APPLE_PRODUCTS: ", APPLE_PRODUCTS)

    // create and yield a dispatch Effect instead of just calling dispatch directly on the Store object as shown above
    yield put({ type: "APPLE_PRODUCTS_RECEIVED" })
  } catch (e) {
    console.log("error")
  }
}

export function* watchFetchAppleProducts() {
  // make sure this action type is different then what you put in the watched saga, otherwise you will enter into an endless loop
  let APPLE_PRODUCTS = yield takeEvery(
    "APPLE_PRODUCTS_REQUESTED",
    fetchAppleProductsAsync
  )
}

export function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchFetchAppleProducts()])
}
