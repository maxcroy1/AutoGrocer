export const initOrder = (orderID) => {
    return {
        type: "INIT_ORDER",
        orderID: orderID
    }
}

export const addItem = (newItem) => {
    return {
        type: "ADD_ITEM_TO_ORDER",
        item: newItem
    }
}

export const selectionComplete = () => {
    return {
        type: "SELECTION_COMPLETE"
    }
}

export const orderComplete = () => {
    return {
        type: "ORDER_CONFIRMED"
    }
}