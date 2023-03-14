import { useContext, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '@/lib/context';
import styles from './PersonalAccount.module.css'
import Select from 'react-select';

const PersonalAccount = () => {
  const { state, dispatch } = useContext(Context)
  const [toggle, setToggle] = useState(true)
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
  const [UserAllergies, setUserAllergies] = useState([])

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
        throw Error(response.statusText)
      }
    }
    userInfosFunc()



    const addAllergies = async () => {
      const res = await fetch('https://quai-antique.xyz/api/allergies')
      const result = await res.json()
      const restAllergies = result['hydra:member'].filter(elt => {
        if (!user.allergies.includes(elt.name)) {
          return elt
        }
      })
      setAllergies(restAllergies.map(elt => {
        return { id: elt.id, value: elt.name, label: elt.name }
      }))
    }
    addAllergies()
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: event.target.email.value,
      name: event.target.name.value,
      allergy: allergiesID
    }
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
  }

  const handleOnChange = (e) => {
    console.log(e);
    setSelectedAllergies(e)
  }

  return (
    !toggle ?
      <>
        <Button className={styles.reservationButton} onClick={() => setToggle(!toggle)}>Vos informations</Button>
        <div className={styles.reservations}>
              {
                user.reservation?.map(elt => {
                  return (  
                    <h3 className='mt-2'>{`${new Date(elt.reservationDate).toLocaleDateString()} a ${new Date(elt.reservationDate).getHours()}h${new Date(elt.reservationDate).getMinutes() !== 0 ? new Date(elt.reservationDate).getMinutes() : ""} pour ${elt.nbCovers} ${elt.nbCovers > 1 ? "personnes" : "personne"}`}</h3>
                  )
                })
              }
            </div>
      </>
      :
      <>
        <div
          className={styles.container}
        >
          <h2>Bienvenu {user.name} !</h2>
          <form onSubmit={handleOnSubmit}>
            <label htmlFor="email">Email</label>
            {!emailRequired && <p className='text-danger fs-6'>Votre email est obligatoire</p>}
            <input type="email" name="email" id="email" placeholder={`${user.email}`} />
            <label htmlFor="name">Name</label>
            {!nameRequired && <p className='text-danger fs-6'>Votre nom est obligatoire</p>}
            <input type="text" name="name" id="name" placeholder={`${user.email}`} />
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
                    <h3 className=''>{elt}</h3>
                  )
                })
              }
            </div>
            <div className={styles.connectionButtons}>
              <Button className='mt-5' type="submit" >Mettre à jour votre profil</ Button>
            </div>
          </form>
        </div>
        <Button className={styles.reservationButton} onClick={() => setToggle(!toggle)}>Réservations</Button>
      </>
  )
}

export default PersonalAccount