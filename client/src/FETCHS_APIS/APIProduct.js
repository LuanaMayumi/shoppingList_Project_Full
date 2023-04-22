const URL = 'http://localhost:3001/products'

// Método GET - traz o estoque com os produtos
// export const gettingProducts = async () => {
//   const response = await fetch(URL)
//   const data = await response.json()
//   return data
// }

// ENVIANDO OS DADOS PARA ATUALIZAR O ESTOQUE
// o product é um objeto com a quantity, qty_stock , id
export const updatingProduct = async (product) => {
  const response = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  return response.json()
}
