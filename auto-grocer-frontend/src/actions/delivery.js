export const addOptions = (options) => {
    return {
        type: "ADD_DELIVERY_OPTIONS",
        day: options.day,
        time: options.time,
        address_one: options.delivery_address_one, 
        address_two: options.delivery_address_two,
        zipcode: options.zipcode,
        phone: options.mobile_num, 
        instructions: options.instructions
    }
}