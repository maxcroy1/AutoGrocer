import React from 'react';
import { Button } from 'react-bootstrap';

function ItemCard(props) {
    return (
        <li>
            <strong>{props.item.name}</strong> {props.item.quantity}x &nbsp;
            <Button variant="secondary" size="sm" onClick={() => props.handleRemove(props.item)}>Remove</Button>
        </li>
    );
}

export default ItemCard;