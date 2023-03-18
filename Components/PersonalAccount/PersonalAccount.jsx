import { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '@/lib/context';
import styles from './PersonalAccount.module.css'
import Select from 'react-select';
import UserReservation from '../UserReservation/UserReservation'
import Login from '../Login/Login';

const PersonalAccount = () => {
  const { state } = useContext(Context)
  const [toggle, setToggle] = useState(true)
  const [valid, setValid] = useState(false)
  const [emailRequired, setEmailRequired] = useState(true)
  const [nameRequired, setNameRequired] = useState(true)
  const [user, setUser] = useState({
    name: "",
    email: "",
    allergies: [],
    reservations: []
  })
  const [allergies, setAllergies] = useState([])
  const [selectedAllergies, setSelectedAllergies] = useState([])
  const [deleteAllergies, setDeleteAllergies] = useState([])

  useEffect(() => {
    const userInfosFunc = async () => {
      const endpoint = `https://quai-antique.xyz/api/users/${state?.user.id}`

      const options = {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${localStorage.token}`
        },
      }
      const response = await fetch(endpoint, options)
      if (response.status == 200) {
        const result = await response.json()
        setUser({
          name: result.name,
          email: result.email,
          allergies: result.allergy,
          reservation: result.reservations
        });
      } else {
        <h1>Veuillez vous reconnectez</h1>
      }
    }
    userInfosFunc()

  }, [state])
  useEffect(() => {
    const addAllergies = async () => {
      const res = await fetch('https://quai-antique.xyz/api/allergies')
      const result = await res.json()
      const restAllergies = []
      result['hydra:member'].filter(elt => {
        if (!user.allergies.includes(elt.name)) {
          return restAllergies.push(elt)
        }
      })
      setAllergies(restAllergies.map(elt => {
        return { id: elt.id, value: elt.name, label: elt.name }
      }))
    }
    addAllergies()
  }, [user])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const allergieName = []
    selectedAllergies.map(elt => allergieName.push(elt.value))
    user.allergies.map(el => allergieName.push(el))
    const allergiesReadyToSend = allergieName.filter(elt => {
      if (!deleteAllergies.includes(elt)) {
        return elt
      }
    })
    console.log(allergiesReadyToSend);
    const data = {
      email: event.target.email.value !== "" ? event.target.email.value : user.email,
      name: event.target.name.value !== "" ? event.target.name.value : user.name,
      allergy: allergiesReadyToSend
    }
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
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

    const JSONdata = JSON.stringify(data)
    const endpoint = `https://quai-antique.xyz/api/users/${state.user.id}`

    const options = {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage.token}`
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)


    if (response.status === 200) {
      setValid(true)
    } else {
      setValid(false)
      return (
        <h1>Veuillez vous reconnectez</h1>
      )
    }
  }

  const handleOnDelete = (event) => {
    return setDeleteAllergies(el => [...el, event.target.innerText])
  }

  const handleOnChange = (e) => {
    setSelectedAllergies(e)
  }

  return (
    !toggle ?
      <>
        <Button className={styles.reservationButton} onClick={() => setToggle(!toggle)}>Vos informations</Button>
        {
          user.reservation !== [] &&
          <div className={styles.reservations}>
            <UserReservation user={user} />
          </div>
        }
      </>
      :
      <>
        {
          !valid ?
            <div
              className={styles.container}
            >
              {
                user.name !== "" ?
                  <>
                    <h2>Bienvenue {user.name} !</h2>
                    <form onSubmit={handleOnSubmit}>
                      <label htmlFor="email">Email</label>
                      {!emailRequired && <p className='text-danger fs-6'>Votre email est obligatoire</p>}
                      <input type="email" name="email" id="email" placeholder={`${user.email}`} />
                      <label htmlFor="name">Name</label>
                      {!nameRequired && <p className='text-danger fs-6'>Votre nom est obligatoire</p>}
                      <input type="text" name="name" id="name" placeholder={`${user.name}`} />
                      <label htmlFor="allergies">Vos allergies</label>
                      <Select
                        onChange={handleOnChange}
                        isMulti
                        name="allergies"
                        options={allergies}
                        className="basic-multi-select mb-3"
                        classNamePrefix="select"
                        styles={{
                          option: (base) => ({
                            ...base,
                            height: '100%',
                            color: 'black'
                          }),
                        }}
                      />
                      <div className={styles.allergies}>
                        {
                          user.allergies?.map(elt => {
                            return (
                              <button type='button' key={elt.id} className={!deleteAllergies.includes(elt) ? styles.allergiesBtn : styles.deleteAllergies} onClick={handleOnDelete}>{elt}</button>
                            )
                          })
                        }
                      </div>
                      <div className={styles.connectionButtons}>
                        <Button className='mt-5' type="submit" >Mettre à jour votre profil</ Button>
                      </div>
                    </form>
                  </>
                  :
                  <div className={styles.registrationLog}>
                    <p className="text-danger mt-4 mb-2 fs-5">désolé, il faut vous reconnecter</p>
                    <Login />
                  </div>
              }
            </div>
            :
            <div className={styles.success}>
              <p>Votre profil à bien été mis à jour</p>
            </div>
        }
        <Button type='submit' className={styles.reservationButton} onClick={() => setToggle(!toggle)}>Réservations</Button>
      </>
  )
}

export default PersonalAccount