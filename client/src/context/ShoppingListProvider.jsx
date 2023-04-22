import PropTypes from 'prop-types'
import React, { useEffect, useState, useMemo } from 'react'
import ShoppingListContext from './ShoppingListContext'

export default function ShoppingListProvider ({ children }) {
  const [data, setData] = useState([])

  const URL_ESTOQUE = 'http://localhost:3001/products'

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(URL_ESTOQUE)
      const data = await response.json()

      setData(data)
    }
    fetchFile()
  }, [])

  const context = useMemo(() => ({
    data
  }), [data])

  return (
    <ShoppingListContext.Provider value={context}>
      {children}
    </ShoppingListContext.Provider>
  )
}

ShoppingListProvider.propTypes = {
  children: PropTypes.node
}
