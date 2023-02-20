import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Reservation.module.css';
import { Button } from 'react-bootstrap';

const Reservation = () => {
    const [value, onChange] = useState(new Date());
    console.log(value);
    const [lunchOrDiner, setLunchOrDiner] = useState("");
    console.log(lunchOrDiner);

    return (
        <div className={styles.container}>
            <form action="" method="post" className={styles.form}>
                <Calendar onChange={onChange} value={value} />
                <div className={styles.buttonContainer}>
                    <Button
                        variant="outline-primary"
                        onClick={() => setLunchOrDiner("lunch")
                        }>Lunch</Button>
                    <Button variant="outline-primary"
                        onClick={() => setLunchOrDiner("diner")
                        }>Diner</Button>
                </div>
            </form>
        </div>
    );
}

export default Reservation