export const logIn = userToken => {
    return {
        type: "LOGIN_USER",
        user: userToken
    }
}

export const logOut = { type: "LOGOUT_USER" }
