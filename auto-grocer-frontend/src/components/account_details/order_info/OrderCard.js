import React from 'react';

function OrderCard(props) {
    return (
        <div key={props.order.id}>
            <h3>{props.order.day}s at {props.order.time}</h3>
            <p><strong>Delivery Address:</strong></p>
            <p>
                {props.order.delivery_address_one}, {props.order.delivery_address_two}<br />
                {props.order.zipcode}
            </p>
            <button>Edit</button>
        </div>
    )
}

export default OrderCard;