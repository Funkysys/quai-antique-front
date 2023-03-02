import Link from 'next/link';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css'

const Login = () => {
  const [user, setUser] = useState()

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

    const result = await response.json()

    setUser(result)
    console.log(result)
  }
  console.log(user);
  return (
    <>
      <div
        className={styles.loginContainer}
      >
        <h2>Bienvenu !</h2>
        <form onSubmit={tryToLog}>
          <input type="email" name="email" id="email" />
          <input type="password" name="password" id="password" />
          <div className={styles.connectionButtons}>
            <Button variant="outline-primary" type="submit">Connexion</ Button>
            <Link href="https://quai-antique.xyz/register" replace>
              <Button className={styles.registerButton}>Inscription</ Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login