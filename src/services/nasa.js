const baseUrl = 'https://stark-cove-38179.herokuapp.com/api/nasa'

const getAPOD = async () => {
  const response = await fetch(`${baseUrl}/apod`);
  return response
}

const getONES = async () => {
  const response = await fetch(`${baseUrl}/neows`)
  return response
}

const getMarsPhotos = async () => {
  const response = await fetch(`${baseUrl}/mars`)
  return response
}

const getEarthPhotos = async () => {
  const response = await fetch(`${baseUrl}/earth`)
  return response
}

export default { getAPOD, getONES, getMarsPhotos, getEarthPhotos }