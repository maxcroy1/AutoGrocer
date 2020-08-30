import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    registration_complete: registrationReducer,
    order: orderReducer
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

function orderReducer(state = {id: "", items: [], selection_complete: false}, action) {
    switch (action.type) {
        case "INIT_ORDER":
            return state = {
                ...state,
                id: action.orderID
            }
            
        case "ADD_ITEM_TO_ORDER":
            return state = {
                ...state,
                items: [...state.items, action.item]
            }

        case "SELECTION_COMPLETE":
            return state.selection_complete = true

        default:
            return state;
    }
}