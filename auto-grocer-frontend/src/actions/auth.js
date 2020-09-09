export function fetchUserData() {
    return (dispatch) => {
        dispatch({ type: 'START_LOGGING_IN_USER' });
        let configObj = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('ag_token')}`
            }
        }
        fetch('http://localhost:3000/profile', configObj)
            .then(resp => resp.json())
            .then(json => dispatch({ type: "LOGIN_USER", json }))
            .catch(dispatch({type: "REGISTER_USER", user: localStorage.getItem('ag_token')}))
    }
}

export const updateUser = (response) => {
    let value = Object.keys(response)
    return {
        type: "UPDATE_USER",
        json: response
    }
}

export const registerUser = (userToken) => {
    return {
        type: "REGISTER_USER",
        user: userToken
    }
}

export const logOut = () => {
    return { type: "LOGOUT_USER" }
}
