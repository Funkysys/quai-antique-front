import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Reservation.module.css';
import { Button } from 'react-bootstrap';

const Reservation = () => {
    const [value, onChange] = useState(new Date());
    console.log(value);
    const [lunchOrDiner, setLunchOrDiner] = useState("");
    console.log(lunchOrDiner);
    const handleOnClick = (event) => { setLunchOrDiner(event.target.innerText) }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <Calendar onChange={onChange} value={value} />
                <div className={styles.buttonContainer}>
                    <Button
                        key="1"
                        variant="outline-primary"
                        onClick={handleOnClick}
                    >Lunch</Button>
                    <Button
                        key="2"
                        variant="outline-primary"
                        onClick={handleOnClick}
                    >
                        Diner
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Reservation