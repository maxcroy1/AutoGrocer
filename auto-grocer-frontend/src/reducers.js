import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    registration_complete: registrationReducer,
    order: orderReducer,
    delivery: deliveryReducer
});

export default rootReducer;

function userReducer(state = { token: "", info: {} }, action) {
        switch (action.type) {
            case "START_LOGGING_IN_USER":
                return state = {
                    ...state,
                    requesting: true
                }

            case "LOGIN_USER":
                return state = {
                    ...state,
                    token: localStorage.getItem('ag_token'), 
                    info: action.json
                }

            case "REGISTER_USER":
                return state = {
                    ...state,
                    token: action.user
                }

            case "LOGOUT_USER": 
                return state = {
                    token: "",
                    info: {}
                }

            default: 
                return state;
        }
}

function registrationReducer(state = false, action) {
    switch (action.type) {
        case "COMPLETE_REGISTRATION":
            return action.complete;

        case "LOGOUT":
            return action.complete;

        default:
            return state;
    }
}

function orderReducer(state = {id: "", items: []}, action) {
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

        case "ORDER_CONFIRMED": 
            return state = {
                ...state,
                id: "",
                items: []
            }

        default:
            return state;
    }
}

function deliveryReducer(state = {day: "", time: "", address_one: "", address_two: "", zipcode: "", phone: "", instructions: ""}, action) {
    switch(action.type) {
        case "ADD_DELIVERY_OPTIONS": 
            return state = {
                ...state, 
                day: action.day,
                time: action.time,
                address_one: action.address_one, 
                address_two: action.address_two,
                zipcode: action.zipcode,
                phone: action.phone, 
                instructions: action.instructions
            }

        case "ORDER_CONFIRMED": 
            return state = {
                ...state,
                day: "",
                time: "",
                address_one: "",
                address_two: "",
                zipcode: "",
                phone: "",
                instructions: ""
            }

        default:
            return state;
    }
}