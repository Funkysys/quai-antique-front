async function submitReservationFunc (e, value, selectedHour, state, dispatch) {
    console.log("on est là");
    const hour = selectedHour?.split(" ")
    const date = `${value.getUTCFullYear()}-${value.getUTCMont()}-${value.getUTCDate()}T${hour[0]}:${hour[2]}:00+00:00`
    e.preventDefault()
    const id = state.user.id
    let data = {
        nbCovers: event.target.cutlery.value,
        reservationDate: date,
        user: `api/user/${id}`
    }
    const JSONdata = JSON.stringify(data)

    const endpoint = 'https://quai-antique.xyz/reservation'

    const options = {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    console.log(response);
    if (response.status == 200) {
        console.log(response)
    } else {
        throw Error(response.statusText)
    }
}

export default submitReservationFunc