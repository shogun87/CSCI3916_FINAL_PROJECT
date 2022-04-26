const read = async (credentials, signal) => {
  try {
    let response = await fetch('/api/country', {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

const update = async (params, credentials, country) => {
  try {
    let response = await fetch('/api/country/' + params.country, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(country)
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const list = async (credentials, search) => {
  try {
    let response = await fetch(`/api/country/search?search=${search.search}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}

export {
  read,
  update,
  list
}