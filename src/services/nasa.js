const getAPOD = async () => {
  const response = await fetch('https://stark-cove-38179.herokuapp.com/api/nasa/apod');
  return response
}

export default { getAPOD }