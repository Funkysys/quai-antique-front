import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css'
import { Context } from '@/lib/context';
import Register from '../Register/Register'
import loginfunc from '@/func/loginfunc'

const Login = () => {
  const { state, dispatch } = useContext(Context);
  const [toggle, setToggle] = useState(false)

  const handleOnClick = () => setToggle(!toggle)

  return (
    !toggle ?
        <div
          className={styles.loginContainer}
        >
          <h2>Bienvenu !</h2>

          <form onSubmit={(e) => loginfunc(e, dispatch)}>
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