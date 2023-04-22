const URL = 'http://localhost:3001/client-request'

// Método POST para inserir as infos no DB
export const postingClientRequest = async (listOfproduct) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listOfproduct)
  })
  return response.json()
}

// Método GET para trazer as infos do DB
// export const gettingClientRequest = async () => {
//   const response = await fetch(URL)
//   const data = response.json()
//   return data
// }
