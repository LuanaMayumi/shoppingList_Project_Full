import React, { useContext, useEffect, useState } from 'react'
import Inputs from '../components/Inputs'
import ProductsList from '../components/ProductsList'
import ShoppingListContext from '../context/ShoppingListContext'
import SaveListOfProducts from '../components/SaveListOfProducts'
import TotalPrice from '../components/TotalPrice'
import { updatingProduct } from '../FETCHS_APIS/APIProduct'
import { postingClientRequest } from '../FETCHS_APIS/APIClientRequest'
import '../styles/Home.sass'

export default function Home () {
  const { data } = useContext(ShoppingListContext)

  // ESTADO CRIADO PARA ARMAZENAR AS INFOS DO USER - NOME, DATA DE ENTREGA E PRODUTO PESQUISADO
  const [infos, setInfos] = useState({
    nameUser: '',
    delivery: '',
    search: ''
  })

  // ESTADO CRIADO PARA ARMAZENAR OS PRODUTOS PESQUISADOS
  const [resercheadProduct, setResercheadProduct] = useState([])

  // ESTADO CRIADO PARA ARMAZENAR OS PRODUTOS ADICIONADOS À LISTA
  const [selectedProduct, setSelectedProduct] = useState([])

  useEffect(() => {
    const filterProducts = () => {
      const products = data.filter((product) =>
        product.name?.toLowerCase().includes(infos.search.toLowerCase())
      )
      setResercheadProduct(products)
    }
    filterProducts()
  }, [infos.search])

  const buttonAddProduct = (item) => {
    const productsAdded = selectedProduct?.some(
      (product) => product.id === item.id
    )
    // console.log('produto encontrado no cart', productsAdded)

    if (productsAdded === true) {
      const newArrayOfProducts = selectedProduct.map((prod) => ({
        ...prod,
        quantity: prod.id === item.id ? prod.quantity + 1 : prod.quantity,
        qty_stock: prod.id === item.id ? prod.qty_stock - 1 : prod.qty_stock
      }))
      setSelectedProduct(newArrayOfProducts)
      setInfos({ ...infos, search: '' })
      return
    }

    setSelectedProduct([
      ...selectedProduct,
      {
        nameItem: item.name,
        id: item.id,
        quantity: 1,
        price: item.price,
        qty_stock: item.qty_stock - 1
      }
    ])
    setInfos({ ...infos, search: '' })
  }

  const totalPriceItems = () => {
    return selectedProduct.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    )
  }

  const saveListAndUpdateQtdade = async () => {
    selectedProduct.forEach(async (product) => {
      const object = {
        quantity: product.quantity,
        id: product.id
      }

      await updatingProduct(object)
    })

    const savedList = {
      name_client: infos.nameUser,
      delivery: infos.delivery,
      productsList: selectedProduct,
      totalValue: totalPriceItems().toFixed(2)
    }

    await postingClientRequest(savedList)
    // console.log('post dados cliente', xx)

    setSelectedProduct([])
  }

  return (
    <form>

      <h1 className="title">Cadastro de pedidos</h1>
      <Inputs infos={infos} setInfos={setInfos} />

      <div className="containerProductsList">
        <div className="productsList">
          {infos.search &&
            resercheadProduct.map((result) => (
              <div className="containerProductSearched" key={result.id}>
                <p>{result.name}</p>
                <button type="button" onClick={() => buttonAddProduct(result)}>
                  Adicionar
                </button>
              </div>
            ))}
        </div>
      </div>
      <ProductsList
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <div className="totalPriceAndFinishRequest">
        <TotalPrice
          selectedProduct={selectedProduct}
          totalPriceItems={totalPriceItems}
        />
        <SaveListOfProducts saveListAndUpdateQtdade={saveListAndUpdateQtdade} />
      </div>
    </form>
  )
}
