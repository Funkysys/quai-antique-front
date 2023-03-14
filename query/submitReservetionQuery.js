async function submitReservationQuery(covers, date, lunch, state, dispatch) {
    const id = state.user.id
    let data = {
        nbCovers: covers,
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
        if (response.status == 401) {
            await dispatch({
                type: "RESERVATION_LOGIN_TEMP",
                payload: true
            })
        }
    }
}

export default submitReservationQuery