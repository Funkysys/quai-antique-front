import { useEffect, useState, useContext } from 'react'
import styles from './ReservationForm.module.css'
import Calendar from 'react-calendar';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Context } from '@/lib/context';
import submitReservationFunc from '@/hooks/submitReservetionFunc'

const ReservationForm = ({ opening_hours }) => {
    const { dispatch, state } = useContext(Context);
    const [value, onChange] = useState(new Date());
    const [lunch, setLunch] = useState(false);
    const [diner, setDiner] = useState(false);
    const [close, setClose] = useState(false);
    const [buttonValue, setButtonValue] = useState()
    const [currentDayLunch, setCurrentDayLunch] = useState()
    const [currentDayDiner, setCurrentDayDiner] = useState()
    const [maxOpeningHour, setMaxOpeningHour] = useState(0)
    const [maxCloseHour, setMaxMaxCloseHour] = useState(0)
    const [hours, setHours] = useState([])
    const [selectedHour, setSelectedHour] = useState()

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

    useEffect(() => {
        setHours([])
        let hoursArr = []
        let tempHours = []
        for (let i = maxOpeningHour; i <= maxCloseHour; i += 15) {
            hoursArr.push(i / 60)
        }
        hoursArr.map(elt => {
            const temp = elt.toString().split(".")
            if (temp[1]) {
                if (temp[1] === '25') {
                    tempHours.push(`${temp[0]} H 15`)
                }
                if (temp[1] === '5') {
                    tempHours.push(`${temp[0]} H 30`)
                }
                if (temp[1] === '75') {
                    tempHours.push(`${temp[0]} H 45`)
                }
            } else if (!temp[1]) {
                tempHours.push(`${temp[0]} H`)
            }
        })
        setHours(tempHours)
    }, [value, maxCloseHour, maxOpeningHour])

    const handleOnClick = (event) => {

        const value = event.target.innerText.toLowerCase()
        if (value === 'lunch') {
            setMaxOpeningHour((currentDayLunch.openingHours.hour * 60) + currentDayLunch.openMinutes.minutes)
            setMaxMaxCloseHour((currentDayLunch.closeHours.hour * 60) + currentDayLunch.closeMinutes.minutes)
        } else if (value === 'diner') {
            setMaxOpeningHour((currentDayDiner.openingHours.hour * 60) + currentDayDiner.openMinutes.minutes)
            setMaxMaxCloseHour((currentDayDiner.closeHours.hour * 60) + currentDayDiner.closeMinutes.minutes)
        }

    }

    const handleOnHour = (event, elt) => {
        setButtonValue(hours.indexOf(elt))
        const value = event.target
        setSelectedHour(value.innerText)
        console.log(value.innerText);
    }
    console.log(state);

    return (
        <form
            className={styles.container}
            onSubmit={(e) => submitReservationFunc(e, value, selectedHour, state, dispatch)}
        >
            <Calendar onChange={onChange} value={value} />
            <div className={styles.buttonContainer}>
                {
                    lunch &&
                    <Button
                        variant="outline-primary"
                        onClick={handleOnClick}
                    >Lunch</Button>
                }
                {
                    diner &&
                    <Button
                        variant="outline-primary"
                        onClick={handleOnClick}
                    >
                        Diner
                    </Button>
                }
                {
                    close &&
                    <h2>On est fermé ! Désolé</h2>
                }
            </div>
            {
                hours.length > 1 && !close &&
                <>
                    <div className={styles.hoursContainer}>
                        {
                            hours.map(elt => {
                                return (
                                    <ButtonGroup
                                    key={hours.indexOf(elt)}
                                    >
                                        <ToggleButton
                                            
                                            variant="outline-danger"
                                            onClick={() => handleOnHour(event, elt)}
                                            checked={buttonValue === hours.indexOf(elt)}
                                            type="radio"
                                        >{elt}
                                        </ToggleButton>
                                    </ButtonGroup>
                                )
                            })
                        }
                    </div>
                    <div className={styles.cutlery}>
                        <label htmlFor="cutlery">Nombre de convives : </label>
                        <input type="number" id='cutlery' name='cutlery' placeholder='0' />
                    </div>
                    <Button type='submit'>Envoyer votre réservation</Button>
                </>
            }
        </form>
    )
}

export default ReservationForm

