import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css'
import { Context } from '@/lib/context';
import jwtDecode from 'jwt-decode';
import Register from '../Register/Register'

const Login = () => {
  const { dispatch } = useContext(Context);
  const [toggle, setToggle] = useState(false)

  const handleOnClick = () => setToggle(!toggle)

  const handleOnLogin = async (e) => {
    e.preventDefault()

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://quai-antique.xyz/auth'

    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    console.log(response);
    if (response.status == 200) {
      const result = await response.json()
      localStorage.setItem("token", `${result?.token}`)

      const decode = jwtDecode(localStorage.token)
      if (decode) {
        await dispatch({
          type: "LOGGED_IN_USER",
          payload: decode
        })
      }
    } else {
      throw Error(response.statusText)
    }
  }

  return (
    !toggle ?
        <div
          className={styles.loginContainer}
        >
          <h2>Bienvenu !</h2>

          <form onSubmit={handleOnLogin}>
            <label htmlFor="password">Email</label>
            <input type="email" name="email" id="email" placeholder='Your Email' />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder='Your Password' />
            <div className={styles.connectionButtons}>
              <Button variant="outline-primary" className={styles.connectionButton} type="submit">Connexion</ Button>
              <Button onClick={handleOnClick} className={styles.registerButton}>Inscription</ Button>
            </div>
          </form>
        </div>
      :
      <Register />
  )
}

export default Login