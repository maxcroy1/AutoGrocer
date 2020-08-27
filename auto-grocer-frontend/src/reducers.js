import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;

function userReducer(state = "", action) {
    switch (action.type) {
        case "LOGIN_USER":
            return action.user; 

        case "LOGOUT_USER": 
            return "";

        default: 
            return state;
    }
}