/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from "react"
import AppleProducts from './src/components/apple-products.component'

const Counter = ({ value, onIncrement, onIncrementAsync, onDecrement, fetchAppleProducts }) => (
  <div>
    <button onClick={onIncrement}>Increment</button>{" "}
    <button onClick={onIncrementAsync}>Increment Async</button>{" "}
    <button onClick={onDecrement}>Decrement</button>
    <hr />
    <div>Clicked: {value} times</div>
    <AppleProducts fetchAppleProducts={fetchAppleProducts} />
  </div>
)

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  fetchAppleProducts: PropTypes.func.isRequired,
}

export default Counter
