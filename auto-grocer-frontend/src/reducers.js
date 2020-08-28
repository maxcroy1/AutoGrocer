import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    registration_complete: registrationReducer
});

export default rootReducer;

function userReducer(state = "", action) {
    switch (action.type) {
        case "LOGIN_USER":
            return action.user

        case "LOGOUT_USER": 
            return ""

        default: 
            return state;
    }
}

function registrationReducer(state = false, action) {
    switch (action.type) {
        case "COMPLETE_REGISTRATION":
            return action.complete;

        default:
            return state;
    }
}