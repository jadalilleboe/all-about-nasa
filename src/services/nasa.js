const baseUrl = 'https://stark-cove-38179.herokuapp.com/api/nasa'

const getResource = async resource => {
  const response = await fetch(`${baseUrl}/${resource}`)
  return response
}

const imageSearch = async data => {
  const response = await fetch(`${baseUrl}/images`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response
}

export default { getResource, imageSearch }