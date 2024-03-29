import { useState, useContext, useEffect } from 'react';
import styles from './Register.module.css';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { Context } from '@/lib/context';
import loginQuery from '@/query/loginQuery'
const Register = () => {
  const { dispatch } = useContext(Context);

  const [emailRequired, setEmailRequired] = useState(true);
  const [nameRequired, setNameRequired] = useState(true);
  const [passwordLength, setPasswordLength] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [registerConfirm, setRegisterConfirm] = useState(false);
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const addAllergies = async () => {
      const res = await fetch('https://quai-antique.xyz/api/allergies');
      const result = await res.json();

      setAllergies(result['hydra:member'].map(elt => {
        return { id: elt.id, value: elt.name, label: elt.name };
      }));
    }
    addAllergies();
  }, [])

  const handleOnChange = (e) => {
    setSelectedAllergies(e);
  }

  const handleOnSubmit = async (e) => {
    if (!isLoading) {
      setIsLoading(true);
      e.preventDefault();
      const allergiesID = [];
      selectedAllergies.map(elt => allergiesID.push(`/api/allergies/${elt.id}`));
      const data = {
        email: event.target.email.value,
        plainPassword: event.target.password.value,
        name: event.target.name.value,
        allergies: allergiesID
      };
      const confirm_password = event.target.confirm_password.value;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      if (data.email && data.email.match(mailformat)) {
        setEmailRequired(true);
      } else {
        return setEmailRequired(false);
      };
      if (data.name) {
        setNameRequired(true);
      } else {
        return setNameRequired(false);
      };
      if (data.plainPassword && data.plainPassword.match(passwordFormat)) {
        setPasswordLength(true);
      } else {
        return setPasswordLength(false);
      };
      if (data.plainPassword === confirm_password) {
        setConfirmPassword(true);
      } else {
        return setConfirmPassword(false);
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = 'https://quai-antique.xyz/api/users';
      
      const options = {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      setIsLoading(false);
      if (response.status === 201) {
        setRegisterConfirm(true);
        loginQuery(e, dispatch, isLoading, setIsLoading, data.email, data.plainPassword);
      } else {
        setRegisterConfirm(false);
        throw Error(response.statusText);
      }
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
          {!passwordLength && <p className='text-danger fs-6'>Votre mot de passe doit contenir au moins 8 caractères, une lettre, un nombre et un caractère spécial</p>}
          <input type="password" name="password" id="password" placeholder='Votre Mot de passe' />
          <label htmlFor="confirm_password">Cofirmez votre mot de passe</label>
          {!confirmPassword && <p className='text-danger fs-6'>Votre mot de passe ne correspond pas à la confirmation</p>}
          <input type="password" name="confirm_password" id="confirm_password" placeholder='Confirmez votre mot de passe' />
          <label htmlFor="allergies">Une allergie à nous signaler ?</label>
          <Select
            onChange={handleOnChange}
            isMulti
            name="allergies"
            options={allergies}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={{
              option: (base) => ({
                ...base,
                height: '100%',
                color: 'black'
              }),
            }}
          />
          {isLoading && <p className='text-alert'>{`ça arrive !`}</p>}
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
};

export default Register;