import React from 'react';
import { Button } from 'react-bootstrap';

function OrderCard(props) {
    return (
        <div key={props.order.id}>
            <h3>{props.order.day}s at {props.order.time}</h3>
            <p><strong>Delivery Address:</strong></p>
            <p>
                {props.order.delivery_address_one}, {props.order.delivery_address_two}<br />
                {props.order.zipcode}
            </p>
            <Button variant="success">Edit</Button>
        </div>
    )
}

export default OrderCard;