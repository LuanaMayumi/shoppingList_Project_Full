import PropTypes from 'prop-types'
import React from 'react'

export default function TotalPrice ({ totalPriceItems }) {
  return (
    <div>
      <p>{`Valor total: R$${totalPriceItems().toFixed(2)}`} </p>
    </div>
  )
}

TotalPrice.propTypes = {
  selectedProduct: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  totalPriceItems: PropTypes.func
}
