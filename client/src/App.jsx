import React from 'react'
import Home from './pages/Home'
import ShoppingListProvider from './context/ShoppingListProvider'

import './index.css'

function App () {
  return (
  // disponibilizando as infos do Provider para a page Home
    <ShoppingListProvider>
      <Home />
    </ShoppingListProvider>
  )
}

export default App
