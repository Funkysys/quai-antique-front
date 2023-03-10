import { useState, useContext } from 'react'
import styles from './Register.module.css'
import { Button } from 'react-bootstrap'
import { Context } from '@/lib/context';
import loginQuery from '@/query/loginQuery'

const Register = () => {
  const { state, dispatch } = useContext(Context);

  const [emailRequired, setEmailRequired] = useState(true)
  const [nameRequired, setNameRequired] = useState(true)
  const [passwordLength, setPasswordLength] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const [registerConfirm, setRegisterConfirm] = useState(false)

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
    
    if (response.status === 201) {
      setRegisterConfirm(true)
      loginQuery(e, dispatch, data.email, data.plainPassword)
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
        {!passwordLength && <p className='text-danger fs-6'>Votre mot de passe doit contenir au moins 6 caract??res</p>}
        <input type="password" name="password" id="password" placeholder='Votre Mot de passe' />
        <label htmlFor="confirm_password">Cofirmez votre mot de passe</label>
        {!confirmPassword && <p className='text-danger fs-6'>Votre mot de passe ne correspond pas ?? la confirmation</p>}
        <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirmez votre mot de passe' />
        <div className={styles.connectionButtons}>
          <Button type="submit" className={styles.registerButton}>Inscription</ Button>
        </div>
      </form>
    </div>
    :
    <div className={styles.succes}>
      <p>Vous ??tes bien inscrit et connect?? !</p>
      <p>Bienvenue chez Quai Antique</p>
    </div>
  )
}

export default Register