const baseUrl = 'https://stark-cove-38179.herokuapp.com/api/nasa'

const getResource = async (resource) => {
  const response = await fetch(`${baseUrl}/${resource}`)
  return response
}

export default { getResource }