import React, { useState, useContext, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from './Reservation.module.css';
import { Button } from 'react-bootstrap';
import { Context } from '@/lib/context';
import ReservationForm from '../ReservationForm/ReservationForm'
import Login from '../Login/Login';

const Reservation = ({ opening_hours }) => {
    const { state } = useContext(Context)
    const [toggle, setToggle] = useState(false)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (state?.user?.name) {
            setIsConnected(true)
        } else {
            setIsConnected(false)
        }
    }, [state])

    const handleOnClick = (event) => {
        event.preventDefault
        setToggle(!toggle)
    }

    return (
        <div className={styles.container}>
            {
                toggle ?
                    isConnected ?
                        <ReservationForm opening_hours={opening_hours}/>
                        :
                        <div className={styles.registrationLog}>
                            <Login />
                        </div>
                    :
                    <Button onClick={handleOnClick}>Réserver</Button>
            }
        </div>
    );
}

export default Reservation