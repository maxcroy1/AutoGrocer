import React from 'react';
import { Button } from 'react-bootstrap';

function OrderCard(props) {
    return (
        <div key={props.order.id}>
            <h4>{props.order.day}s at {props.order.time}</h4>
            <p><strong>Delivery Address:</strong></p>
            <p>
                {props.order.delivery_address_one}, {props.order.delivery_address_two}<br />
                {props.order.zipcode}
            </p>
            <Button variant="success">Edit</Button>
            <br /><br />
        </div>
    )
}

export default OrderCard;