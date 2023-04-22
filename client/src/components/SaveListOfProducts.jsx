import React from 'react'
import PropTypes from 'prop-types'

export default function SaveListOfProducts ({ saveListAndUpdateQtdade }) {
  return (
    <div>
      <button
      className='buttonFinishRequest'
      type='button'
      onClick={() => saveListAndUpdateQtdade()}
      >
        Finalizar cadastro de pedidos
      </button>
    </div>
  )
}

SaveListOfProducts.propTypes = {
  saveListAndUpdateQtdade: PropTypes.func
}.isRequired
