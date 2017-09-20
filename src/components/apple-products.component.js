/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from "react"

const AppleProducts = ({ fetchAppleProducts }) => (
  <div>
    <button onClick={fetchAppleProducts}>Fetch Apple Products</button>
  </div>
)

AppleProducts.propTypes = {
  fetchAppleProducts: PropTypes.func.isRequired
}

export default AppleProducts
