import { useEffect, useState, useContext } from 'react'
import styles from './ReservationForm.module.css'
import Calendar from 'react-calendar';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Context } from '@/lib/context';
import submitReservationQuery from '@/query/submitReservetionQuery'

const ReservationForm = ({ opening_hours }) => {
    const { dispatch, state } = useContext(Context);
    const [value, onChange] = useState(new Date());
    const [totalCapacity, setTotalCapacity] = useState();
    const [restCapacity, setRestCapacity] = useState([]);
    const [lunch, setLunch] = useState(false);
    const [diner, setDiner] = useState(false);
    const [close, setClose] = useState(false);
    const [lunchOrDiner, setLunchOrDiner] = useState(false);
    const [buttonValue, setButtonValue] = useState()
    const [currentDayLunch, setCurrentDayLunch] = useState()
    const [currentDayDiner, setCurrentDayDiner] = useState()
    const [maxOpeningHour, setMaxOpeningHour] = useState(0)
    const [maxCloseHour, setMaxMaxCloseHour] = useState(0)
    const [hours, setHours] = useState([])
    const [month, setMonth] = useState("")
    const [date, setDate] = useState("")
    const [covers, setCovers] = useState(0)
    const [selectedHour, setSelectedHour] = useState("")
    const [dateError, setDateError] = useState(false)
    const [hourError, setHourError] = useState(false)
    const [coversError, setCoversError] = useState(false)

    useEffect(() => {
        const totalCapacityQuery = async () => {
            const res = await fetch('https://quai-antique.xyz/api/restaurants')
                .then(response => response.json())
                .then(result => setTotalCapacity(result['hydra:member'][0].capacity))
        }
        totalCapacityQuery()
    }, [])

    useEffect(() => {

        if (value.getMonth().length === 1) {
            setMonth(`0${value.getUTCMonth()}`)
        } else {
            setMonth(`${value.getUTCMonth()}`)
        }
        const restCapacityQuery = async () => {
            const tempArr = []
            const reducer = (accumulator, curr) => accumulator + curr;
            const res = await fetch(`https://quai-antique.xyz/api/reservations?page=1&reservationDate=${value.getUTCFullYear()}-0${value.getUTCMonth()}-${value.getUTCDate()}&lunchOrDiner=${lunchOrDiner}`)
                .then(response => {
                    return response.json()
                })
                .then(result => result['hydra:member'].map(elt => {
                    tempArr.push(elt.nbCovers)
                }))

            if (tempArr[0]) {
                setRestCapacity(tempArr.reduce(reducer))
            } else {
                setRestCapacity(0)
            }
        }
        restCapacityQuery()
    }, [value, lunchOrDiner])

    useEffect(() => {
        if (selectedHour) {
            const hourSplit = selectedHour.split(" ")
            if (hourSplit.length <= 2) {
                setDate(`${value.getUTCFullYear()}-${month}-${value.getUTCDate()}T${hourSplit[0]}`)
            } else {
                setDate(`${value.getUTCFullYear()}-${month}-${value.getUTCDate()}T${hourSplit[0]}:${hourSplit[2]}:00`)
            }
        }
    }, [selectedHour, value, month])

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
        for (let i = maxOpeningHour; i <= (maxCloseHour - 45); i += 15) {
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
            setLunchOrDiner(true)
            setMaxOpeningHour((currentDayLunch.openingHours.hour * 60) + currentDayLunch.openMinutes.minutes)
            setMaxMaxCloseHour((currentDayLunch.closeHours.hour * 60) + currentDayLunch.closeMinutes.minutes)
        } else if (value === 'diner') {
            setLunchOrDiner(false)
            setMaxOpeningHour((currentDayDiner.openingHours.hour * 60) + currentDayDiner.openMinutes.minutes)
            setMaxMaxCloseHour((currentDayDiner.closeHours.hour * 60) + currentDayDiner.closeMinutes.minutes)
        }

    }

    const handleOnHour = (event, elt) => {
        setButtonValue(hours.indexOf(elt))
        const hour = event.target
        setSelectedHour(hour.innerText)
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        setCovers(event.target.cutlery.value * 1)
        const tempTime = new Date()
        const tempDate = new Date(tempTime.getFullYear(), tempTime.getMonth(), tempTime.getDate()).getTime()
        console.log(value.getTime() < tempDate);
        if (value.getTime() < tempDate) {
            return setDateError(true)
        } else {
            setDateError(false)
        }
        if (!selectedHour) {
            return setHourError(true)
        } else {
            setHourError(false)
        }
        if (covers <= 0) {
            return setCoversError(true)
        } else {
            setCoversError(false)
        }
        if (!hourError, !dateError, !coversError) {
            submitReservationQuery(covers, date, lunchOrDiner, state, dispatch)
        }
        if (state.user.login_temp) {
            const handleOnDisconnect = () => {
                localStorage.removeItem('token')
                dispatch({
                    type: "LOGOUT_USER",
                    payload: null
                })
            }
            handleOnDisconnect
        }
    }

    return (
        state?.login_temp ?
            <div className={styles.result}><h2>Veuillez vous reconnecter s'il vous plait</h2></div>
        :
        state?.reservation ?
            <div className={styles.result}><h2>Votre r??servation est prise en compte</h2></div>
            :
            <form
                className={styles.container}
                onSubmit={(e) => handleOnSubmit(e)}
            >
                {
                    dateError && <p className='text-danger fs-6'> Vous devez s??lectionner une date ult??rieur ?? la date actuelle</p>
                }
                <Calendar onChange={onChange} value={value} />
                {
                    hourError && <p className='text-danger fs-6'> {`Vous devez s??lectionner l'heure a laquelle vous comptez nous rejoindre`}</p>
                }
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
                        <h2 className={styles.result}>On est ferm?? ! D??sol??</h2>
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
                        {
                            coversError && <p className='text-danger fs-6'> Vous ne pouvez pas r??erver pour... personne...</p>
                        }
                        <div className={styles.cutlery}>
                            <label htmlFor="cutlery">Nombre de convives : </label>
                            <input type="number" id='cutlery' name='cutlery' placeholder='0' />
                        </div>
                        {
                            totalCapacity > restCapacity ?
                                <>
                                    <h3 className={styles.capacity}>Il reste {totalCapacity - restCapacity} places ! ne tardez pas</h3>
                                    <Button type='submit'>Envoyer votre r??servation</Button>
                                </>
                                :
                                <h3 className={styles.capacity}>Nous sommes victimes de notre succ??s... essayez une autre date !</h3>
                        }
                    </>
                }
            </form>
    )
}

export default ReservationForm

// https://quai-antique.xyz/api/reservations?page=1&reservationDate=2023-2-14&lunchOrDiner=true
// https://quai-antique.xyz/api/reservations?page=1&reservationDate=2023-02-15&lunchOrDiner=true