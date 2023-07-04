import jwtDecode from 'jwt-decode';

async function loginQuery(e, dispatch, isLoading, setIsLoading, email = null, password = null) {
    e.preventDefault();
    
    if (!isLoading) {
        setIsLoading(true);
        let data = {};
        if (email && password) {
            data = {
                email,
                password
            };
        } else {
            data = {
                email: event.target.email.value,
                password: event.target.password.value,
            };
        };
        const JSONdata = JSON.stringify(data);

        const endpoint = 'https://quai-antique.xyz/auth';

        const options = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        const response = await fetch(endpoint, options);
        setIsLoading(false);
        if (response.status == 200) {
            const result = await response.json();
            localStorage.setItem("token", `${result?.token}`);
            const decode = jwtDecode(localStorage.token);
            if (decode) {
                await dispatch({
                    type: "LOGGED_IN_USER",
                    payload: decode
                });
                await dispatch({
                    type: "RESERVATION_LOGIN_TEMP",
                    payload: false
                });
            };
        } else {
            await dispatch({
                type: "RESERVATION_LOGIN_TEMP",
                payload: true
            });
        };
    };
};

export default loginQuery;