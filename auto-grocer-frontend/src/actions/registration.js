export const completeRegistration = () => {
    return {
        type: "COMPLETE_REGISTRATION",
        complete: true
    }
}

export const registrationLogout = () => {
    return {
        type: "LOGOUT",
        complete: false
    }
}