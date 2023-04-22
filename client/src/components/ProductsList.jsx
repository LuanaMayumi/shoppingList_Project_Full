import PropTypes from 'prop-types'
import React from 'react'

export default function ProductsList ({ selectedProduct, setSelectedProduct }) {
  const decreaseProduct = (product) => {
    const decrease = selectedProduct.map((item) => {
      if (item.id === product.id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
          qty_stock: item.qty_stock + 1
        }
      }
      return item
    })
    setSelectedProduct(decrease)
  }

  const increaseProduct = (product) => {
    const increase = selectedProduct.map((item) => {
      if (item.id === product.id && item.quantity >= 1 && item.qty_stock > 0) {
        return {
          ...item,
          quantity: item.quantity + 1,
          qty_stock: item.qty_stock - 1
        }
      }
      return item
    })
    const itemFound = selectedProduct.find((item) => item.id === product.id)
    if (itemFound.qty_stock === 0) {
      alert(
        'A quantidade solicitada não está disponível no momento! Volte mais tarde =)'
      )
    }
    setSelectedProduct(increase)
  }

  const deleteProduct = (product) => {
    const deleteItem = selectedProduct.filter((item) => item.id !== product.id)
    setSelectedProduct(deleteItem)
  }

  return (
    <div className="containerListOfProducts">
      <h1>Lista de produtos:</h1>
      <table>
        <thead>
          <tr className="titleProducts">
            <th>Nome do produto:</th>
            <th>Qtdd selecionada: </th>
            <th>Qtdd disponível no estoque:</th>
          </tr>
        </thead>

        {selectedProduct.map((product) => (
          <tbody key={product.id}>
            <tr className="productsChosen">
              <td className="nameProduct">
                <p>{product.nameItem}</p>
              </td>

              <td>
                <button type="button" onClick={() => decreaseProduct(product)}>
                  -
                </button>

                <td>{product.quantity}</td>

                <button type="button" onClick={() => increaseProduct(product)}>
                  +
                </button>
              </td>

              <td>
                <button type="button" onClick={() => deleteProduct(product)}>
                  Excluir
                </button>
              </td>

              <td className="qtyProduct">{product.qty_stock}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

ProductsList.propTypes = {
  selectedProduct: PropTypes.arrayOf(
    PropTypes.shape({
      filter: PropTypes.func,
      find: PropTypes.func,
      map: PropTypes.func
    })
  ),
  setSelectedProduct: PropTypes.func
}
