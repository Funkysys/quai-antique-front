import { useContext, useEffect, useState } from 'react'
import styles from './LoginOrRegister.module.css'
import Button from 'react-bootstrap/Button';
import Login from '../Login/Login'
import { Context } from '@/lib/context';
import jwtDecode from 'jwt-decode';


const LoginOrRegister = () => {
  const { state, dispatch } = useContext(Context);
  const [toggle, setToggle] = useState(false)
  const [user, setUser] = useState()

  const handleOnClick = () => setToggle(!toggle)
  const handleOnDisconnect = () => {
    localStorage.removeItem('token')
    dispatch({
      type: "LOGOUT_USER",
      payload: null
    })
    setUser(null)
  }
useEffect(() => {
  if (typeof window !== 'undefined') {
    if(state?.user.name) {
      setUser(state.user)
    }
  }
}, [state])

  useEffect(() => {
    async function autoConnexion() {
      if (typeof window !== 'undefined') {
        if (localStorage.token && localStorage.token !== undefined) {
          const decode = jwtDecode(localStorage.token)
          if (decode) {
            await dispatch({
              type: "LOGGED_IN_USER",
              payload: decode
            })
            setUser(state)
          }
        }
      }
    }
    autoConnexion()
  }, [])
  return (
    user ?
      <Button variant='outline-primary' onClick={handleOnDisconnect}>logout</Button>
      :
      !toggle ?
        <Button onClick={handleOnClick} variant="outline-primary"> Connexion</Button>
        :
        <>
          <Button onClick={handleOnClick} variant="outline-primary"> Connexion</Button>
          <div className={styles.loginOrRegisterContainer}>
            <Button onClick={handleOnClick} variant="danger" className={styles.closeButton}>X</Button>
            <Login />
          </div>
        </>
  )
}

export default LoginOrRegister