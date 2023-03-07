import React, { useState, useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from './Reservation.module.css';
import { Button } from 'react-bootstrap';
import { Context } from '@/lib/context';
import ReservationForm from '../ReservationForm/ReservationForm'

const Reservation = ({ opening_hours }) => {
    const {state} = useContext(Context)
    const [toggle, setToggle] = useState(false)
    const [value, onChange] = useState(new Date());
    const [lunchOrDiner, setLunchOrDiner] = useState("");

    const handleOnClick = (event) => {
        event.preventDefault
    }

    return (
        <div className={styles.container}>
            {
                toggle ?
                     <ReservationForm />
                    :
                    <Button onClick={() => setToggle(!toggle)}>Réserver</Button>
            }
        </div>
    );
}

export default Reservation