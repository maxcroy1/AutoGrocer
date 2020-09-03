import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    registration_complete: registrationReducer,
    order: orderReducer,
    delivery: deliveryReducer
});

export default rootReducer;

function userReducer(state = { 
    token: "", 
    fname: "", 
    lname: "", 
    email: "",
    username: "",
    billing_settings: {
        id: "",
        instacart_email: "",
        card_num: "",
        expiration: "",
        cvc: "",
        street_address: "",
        city: "",
        state: "",
        zipcode: ""
    },
    orders: [],
    requesting: false
    }, action) {
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
                    fname: action.json.user.fname, 
                    lname: action.json.user.lname, 
                    email: action.json.user.email,
                    username: action.json.user.username,
                    billing_settings: {
                        id: action.json.billing_settings.id,
                        instacart_email: action.json.billing_settings.instacart_email,
                        card_num: action.json.billing_settings.card_num.slice(-4),
                        expiration: action.json.billing_settings.expiration,
                        cvc: action.json.billing_settings.cvc,
                        street_address: action.json.billing_settings.street_address,
                        city: action.json.billing_settings.city,
                        state: action.json.billing_settings.state,
                        zipcode: action.json.billing_settings.zipcode
                    },
                    orders: action.json.orders,
                    requesting: false
                }

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

        case "LOGOUT":
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
            return state = {
                ...state,
                selection_complete: true
            }

        case "ORDER_CONFIRMED": 
            return state = {
                ...state,
                id: "",
                items: [],
                selection_complete: false
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