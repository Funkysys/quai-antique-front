import { useEffect, useState } from 'react'
import styles from './ReservationForm.module.css'
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';
import ReservationHours from '../ReservationHours/ReservationHours'

const ReservationForm = ({ opening_hours }) => {
    const [dinerOrLunch, setDinerOrLunch] = useState("")
    const [value, onChange] = useState(new Date());
    const [lunch, setLunch] = useState(false);
    const [diner, setDiner] = useState(false);
    const [close, setClose] = useState(false);
    const [currentDayLunch, setCurrentDayLunch] = useState()
    const [currentDayDiner, setCurrentDayDiner] = useState()

    useEffect(() => {
        opening_hours['hydra:member'].map(elt => {
            let dayIndex;
            if (elt.day.day === "Lundi") dayIndex = 1
            if (elt.day.day === "Mardi") dayIndex = 2
            if (elt.day.day === "Mercredi") dayIndex = 3
            if (elt.day.day === "Jeudi") dayIndex = 4
            if (elt.day.day === "Vendredi") dayIndex = 5
            if (elt.day.day === "Samedi") dayIndex = 6
            if (elt.day.day === "Dimanche") dayIndex = 0
            if (value.getDay() === dayIndex) {
                if (!elt.lunch && !elt.diner && elt.close) {
                    setClose(true)
                    setDiner(false)
                    setLunch(false)
                } else if (elt.close && !elt.diner) {
                    setDiner(false)
                } else if (elt.close && !elt.lunch) {
                    setLunch(false)
                } else if (elt.lunch) {
                    setCurrentDayLunch(elt)
                    setClose(false)
                    setLunch(true)
                } else if (elt.diner) {
                    setCurrentDayDiner(elt)
                    setClose(false)
                    setDiner(true)
                } else if (!elt.lunch) {
                    setClose(false)
                    setLunch(false)
                } else if (!elt.diner) {
                    setClose(false)
                    setDiner(false)
                }
            }
        })
    }, [value.getDay()])
    const handleOnClick = (event) => {
        const value = event.target.innerText.toLowerCase()
        if (value === 'lunch') {
            console.log(currentDayLunch)
        } else if (value === 'diner') {
            console.log(currentDayDiner);
        }
        setDinerOrLunch(value)
    }

    return (
        <form className={styles.form}>
            <Calendar onChange={onChange} value={value} />
            <div className={styles.buttonContainer}>
                {
                        lunch &&
                    <>
                        <Button
                            variant="outline-primary"
                            onClick={handleOnClick}
                        >Lunch</Button>
                        {
                            dinerOrLunch === "lunch" &&
                            <ReservationHours currentDayLunch={currentDayLunch} />
                        }
                    </>
                }
                {
                    diner &&
                    <>
                        <Button
                            variant="outline-primary"
                            onClick={handleOnClick}
                        >
                            Diner
                        </Button>
                        {
                            dinerOrLunch === "diner" &&
                            <ReservationHours currentDayDiner={currentDayDiner} />
                        }
                    </>
                }
                {
                    close &&
                    <h2>On est fermé ! Désolé</h2>
                }
            </div>
        </form>
    )
}

export default ReservationForm

