const loginCheck = async () => {
    
    const data = sessionStorage.getItem('token')

    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://quai-antique.xyz/login_check'

    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000/'
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
    
    const response = await fetch(endpoint, options)
    const result = await response.json()

    setUser(result)
    console.log(result)
  }