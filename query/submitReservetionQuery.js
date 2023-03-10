async function submitReservationQuery (e, date, lunch, state, dispatch) {
    e.preventDefault()
    const id = state.user.id
    let data = {
        nbCovers: event.target.cutlery.value * 1,
        reservationDate: date,
        user: `/api/users/${id}`,
        lunchOrDiner: lunch
    }
    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://quai-antique.xyz/api/reservations'

    const options = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.token}` 
        },
        body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    if (response.status == 201) {
            await dispatch({
                type: "RESERVATION_DONE",
                payload: true
            })
    } else {
        if (response.status == 201){
            type: "RESERVATION_LOGIN_TEMP"
            payload: true
        }
    }
}

export default submitReservationQuery