const baseUrl = 'https://stark-cove-38179.herokuapp.com/api/nasa'

const getResource = async (resource) => {
  const response = await fetch(`${baseUrl}/${resource}`)
  return response
}

const getDonki = async () => {
  const response = await fetch(`${baseUrl}/donki`)
  return response
}

export default { getResource }