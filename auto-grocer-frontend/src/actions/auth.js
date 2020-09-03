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
            .then(json => {
                console.log(json)
                dispatch({ type: "LOGIN_USER", json })
            })
    }
}

// export const logIn = (userToken) => {
//     return {
//         type: "LOGIN_USER",
//         user: userToken
//     }
// }

export const logOut = () => {
    return { type: "LOGOUT_USER" }
}
