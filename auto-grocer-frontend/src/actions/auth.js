export const logIn = (userToken) => {
    return {
        type: "LOGIN_USER",
        user: userToken
    }
}

export const logOut = () => {
    return { type: "LOGOUT_USER" }
}
