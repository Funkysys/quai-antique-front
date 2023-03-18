import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import styles from './Login.module.css'
import { Context } from '@/lib/context';
import Register from '../Register/Register'
import loginQuery from '@/query/loginQuery'

const Login = () => {
  const { state, dispatch } = useContext(Context);
  const [toggle, setToggle] = useState(false)

  const handleOnClick = async () => setToggle(!toggle)

  return (
    !toggle ?
      <div
        className={styles.loginContainer}
      >
        <h2>Bienvenu !</h2>
        <form onSubmit={(e) => loginQuery(e, dispatch)}>
          <label htmlFor="password">Email</label>
          <input type="email" name="email" id="email" placeholder='Your Email' />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='Your Password' />
          {
            state?.login_temp &&
            <>
              <p className="text-danger fs-6 mt-2">{`Quelque chose s'est mal passé !`}</p>
              <p className="text-danger fs-6 mb-3">Vérifier votre Email et votre mot de passe</p>
            </>
          }
          <div className={styles.connectionButtons}>
            <Button variant="outline-primary" className={styles.connectionButton} type="submit">Connexion</ Button>
            <Button onClick={handleOnClick} variant="outline-success" className={styles.registerButton}>Inscription</ Button>
          </div>
            <a className='fs-6 m-auto mt-2' href='https://quai-antique.xyz/reset-password'>Mot de passe oublié</a>
        </form>
      </div>
      :
      <Register />
  )
}

export default Login