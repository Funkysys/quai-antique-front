async function submitReservationFunc (e, value, selectedHour, state, dispatch) {
    e.preventDefault()
    console.log("on est là");
    const hour = selectedHour?.split(" ")
    let date = ""
    if (!hour[2]) {
        date = `${value.getUTCFullYear()}-${value.getUTCMonth()}-${value.getUTCDate()}T${hour[0]}:00:00+00:00`
    } else {
        date = `${value.getUTCFullYear()}-${value.getUTCMonth()}-${value.getUTCDate()}T${hour[0]}:${hour[2]}:00+00:00`
    }
    const id = state.user.id
    let data = {
        nbCovers: event.target.cutlery.value * 1,
        reservationDate: date,
        user: `/api/users/${id}`
    }
    const JSONdata = JSON.stringify(data)
console.log(JSONdata);
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
    console.log(options);
    const response = await fetch(endpoint, options)
    console.log(response);
    if (response.status == 201) {
            await dispatch({
                type: "RESERVATION_DONE",
                payload: true
            })
    } else {
        throw Error(response.statusText)
    }
}

export default submitReservationFunc