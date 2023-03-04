import Link from 'next/link';
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css'
import jwt_decode from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState()
  const [toggle, setToggle] = useState(false)

  const handleOnClick = () => setToggle(!toggle)
  const handleOnDisconnect = () => {
    localStorage.removeItem('token')
    setUser('')
    console.log(user, localStorage.token);
  }

  const tryToLog = async (e) => {
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
    if (response.status == 200) {
      const result = await response.json()

      setUser(result)
      localStorage.setItem("token", `${result?.token}`)

    } else {
      throw Error(response.statusText)
    }
  }
  useEffect(() => {
    async function autoConnexion() {
      if (typeof window !== 'undefined') {
        if (!user && localStorage.token) {
          const decode = jwt_decode(localStorage.token)
          if (decode) {
            await setUser(decode)
          }
        }
      }
    }
    autoConnexion()
  }, [user])

  console.log(user);
  return (
    user && user !== '' ?
      <>
        <Button variant='outline-primary' onClick={handleOnDisconnect}>logout</Button>
      </> :
      <>
        {
          !toggle ?
            <Button onClick={handleOnClick} variant="outline-primary"> Connexion</Button>
            :
            <>
              <Button onClick={handleOnClick} variant="outline-primary"> Connexion</Button>
              <div
                className={styles.loginContainer}
              >
                <h2>Bienvenu !</h2>
                <Button onClick={handleOnClick} variant="danger" className={styles.closeButton}>X</Button>
                <form onSubmit={tryToLog}>
                  <label htmlFor="password">Email</label>
                  <input type="email" name="email" id="email" placeholder='Your Email' />
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" placeholder='Your Password' />
                  <div className={styles.connectionButtons}>
                    <Button variant="outline-primary" className={styles.connectionButton} type="submit">Connexion</ Button>
                    <Link href="https://quai-antique.xyz/register" replace>
                      <Button className={styles.registerButton}>Inscription</ Button>
                    </Link>
                  </div>
                </form>
              </div>
            </>
        }
      </>
  )
  console.log(user)
}

export default Login