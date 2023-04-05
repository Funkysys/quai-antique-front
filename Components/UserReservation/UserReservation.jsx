import { useState, useEffect } from 'react'
import styles from './UserReservation.module.css'
const UserReservation = ({ user }) => {
    const [toggle, setToggle] = useState(true)
    const [passedReservationButton, setPassedReservationButton] = useState(false)
    const [futureReservationButton, setFutureReservationButton] = useState(false)
    const [passedReservation, setPassedReservation] = useState([])
    const [futureReservation, setFutureReservation] = useState([])
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    console.log(user.reservation)
    const handleOnFormules = () => {
        if (!toggle) {
            setToggle(true)
            setPassedReservationButton(true)
            setFutureReservationButton(false)
        }
    }
    const handleOnMenu = () => {
        if (toggle) {
            setToggle(false)
            setPassedReservationButton(false)
            setFutureReservationButton(true)
        }
    }
    useEffect(() => {
        setFutureReservationButton([])
        setPassedReservationButton([])
        user.reservation?.filter(elt => {
            if (new Date(elt.reservationDate).getTime() > Date.now()) {
                if (!futureReservation.includes(elt)) {
                    setFutureReservation(el => [...el, elt])
                }
            } else if (new Date(elt.reservationDate).getTime() < Date.now()) {
                if (!passedReservation.includes(elt)) {
                    setPassedReservation(el => [...el, elt])
                }
            }
        })
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <button
                    onClick={handleOnFormules}
                    className={!passedReservationButton ? styles.button : styles.activeButton}
                >
                    Anciennes Réservations
                </button>
                <button
                    onClick={handleOnMenu}
                    className={!futureReservationButton ? styles.button : styles.activeButton}
                >
                    Futures Réservations
                </button>
            </div>
            {
                futureReservationButton &&
                <div className={styles.reservations}>
                    <div className={styles.reservationContainer}>
                        {futureReservation?.map(elt => {
                            return (
                                <h3 key={elt => new Date(elt.reservationDate).getTime()} className='mt-2 '>{`${new Date(elt.reservationDate).toLocaleDateString('fr-FR', dateOptions)} à ${new Date(elt.reservationDate).getUTCHours()}h${new Date(elt.reservationDate).getMinutes() !== 0 ? new Date(elt.reservationDate).getMinutes() : ""} pour ${elt.nbCovers} ${elt.nbCovers > 1 ? "personnes" : "personne"}`}</h3>
                            )
                        })}
                    </div>
                </div>
            }

            {
                passedReservationButton &&
                <div className={styles.reservations}>
                    <div className={styles.reservationContainer}>
                        {passedReservation?.map(elt => {
                            return (
                                <h3 key={elt => new Date(elt.reservationDate).getTime()} className='mt-2'>{`${new Date(elt.reservationDate).toLocaleDateString('fr-FR', dateOptions)} à ${new Date(elt.reservationDate).getUTCHours()}h${new Date(elt.reservationDate).getMinutes() !== 0 ? new Date(elt.reservationDate).getMinutes() : ""} pour ${elt.nbCovers} ${elt.nbCovers > 1 ? "personnes" : "personne"}`}</h3>
                            )
                        })}
                    </div>
                </div>
            }
        </div >
    )
}

export default UserReservation