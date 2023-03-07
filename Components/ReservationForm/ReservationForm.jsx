import { useState } from 'react'
import styles from './ReservationForm.module.css'
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';

const ReservationForm = () => {
    const [value, onChange] = useState(new Date());
    const [lunchOrDiner, setLunchOrDiner] = useState("");

    const handleOnClick = (event) => {
        event.preventDefault
    }
    
    return (
        <div>
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
        </div>
    )
}

export default ReservationForm