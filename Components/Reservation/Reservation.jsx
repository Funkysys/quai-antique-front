import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Reservation.module.css';
import { Button } from 'react-bootstrap';

const Reservation = ({ opening_hours }) => {
    // opening_hours['hydra:member'].map(elt => console.log(elt.openingHours.hour))

    const [toggle, setToggle] = useState(false)
    const [value, onChange] = useState(new Date());
    const [lunchOrDiner, setLunchOrDiner] = useState("");

    const handleOnClick = (event) => setLunchOrDiner(event.target.innerText)
    // console.log(value.getDay())

    return (
        <div className={styles.container}>
            {
                toggle ?
                    <form className={styles.form}>
                        <Calendar onChange={onChange} value={value} />
                        <div className={styles.buttonContainer}>
                            <Button
                                variant="outline-primary"
                                onClick={handleOnClick}
                            >Lunch</Button>
                            <Button
                                variant="outline-primary"
                                onClick={handleOnClick}
                            >
                                Diner
                            </Button>
                        </div>
                    </form>
                    :
                    <Button onClick={() => setToggle(!toggle)}>Réserver</Button>
            }
        </div>
    );
}

export default Reservation