const baseUrl = 'https://stark-cove-38179.herokuapp.com/api/nasa'

const getAPOD = async () => {
  const response = await fetch(`${baseUrl}/apod`);
  return response
}

const getONES = async () => {
  console.log('hi')
  const response = await fetch(`${baseUrl}/neows`)
  console.log(response)
  return response
}

export default { getAPOD, getONES }