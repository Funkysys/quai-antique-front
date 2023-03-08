import { useState, useContext } from 'react'
import styles from './Register.module.css'
import { Button } from 'react-bootstrap'
import { Context } from '@/lib/context';
import jwtDecode from 'jwt-decode';

const Register = () => {
  const { state, dispatch } = useContext(Context);

  const [emailRequired, setEmailRequired] = useState(true)
  const [nameRequired, setNameRequired] = useState(true)
  const [passwordLength, setPasswordLength] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const [registerConfirm, setRegisterConfirm] = useState(false)

  async function loginfunc (e, dispatch, email = null, password = null) {
    e.preventDefault()
    let data = {}
    if (email && password) {
        data = {
            email,
            password
        }
    } else {
        data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
    }
    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://quai-antique.xyz/auth'

    const options = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
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

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email: event.target.email.value,
      plainPassword: event.target.password.value,
      name: event.target.name.value,
    }
    const confirm_password = event.target.confirm_password.value
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.email && data.email.match(mailformat)) {
      setEmailRequired(true)
    } else {
      return setEmailRequired(false)
    }
    if (data.name) {
      setNameRequired(true)
    } else {
      return setNameRequired(false)
    }
    if (data.plainPassword.length > 6) {
      setPasswordLength(true)
    } else {
      return setPasswordLength(false)
    }
    if (data.plainPassword === confirm_password) {
      setConfirmPassword(true)
    } else {
      return setConfirmPassword(false)
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://quai-antique.xyz/api/users'

    const options = {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    console.log(response);
    if (response.status === 201) {
      setRegisterConfirm(true)
      loginfunc(e, dispatch, data.email, data.plainPassword)
    } else {
      setRegisterConfirm(false)
      throw Error(response.statusText)
    }
  }
  return (
    !registerConfirm ?
    <div className={styles.loginContainer}>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">Email</label>
        {!emailRequired && <p className='text-danger fs-6'>Votre email est obligatoire</p>}
        <input type="email" name="email" id="email" placeholder='Votre Email' />
        <label htmlFor="name">Name</label>
        {!nameRequired && <p className='text-danger fs-6'>Votre nom est obligatoire</p>}
        <input type="text" name="name" id="name" placeholder='Votre Nom' />
        <label htmlFor="password">Mot de passe</label>
        {!passwordLength && <p className='text-danger fs-6'>Votre mot de passe doit contenir au moins 6 caractères</p>}
        <input type="password" name="password" id="password" placeholder='Votre Mot de passe' />
        <label htmlFor="confirm_password">Cofirmez votre mot de passe</label>
        {!confirmPassword && <p className='text-danger fs-6'>Votre mot de passe ne correspond pas à la confirmation</p>}
        <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirmez votre mot de passe' />
        <div className={styles.connectionButtons}>
          <Button type="submit" className={styles.registerButton}>Inscription</ Button>
        </div>
      </form>
    </div>
    :
    <div className={styles.succes}>
      <p>Vous êtes bien inscrit et connecté !</p>
      <p>Bienvenue chez Quai Antique</p>
    </div>
  )
}

export default Register