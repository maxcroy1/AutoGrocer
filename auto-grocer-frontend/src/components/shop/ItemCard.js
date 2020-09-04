import React from 'react';

function ItemCard(props) {
    return (
        <li>
            <strong>{props.item.name}</strong> {props.item.quantity}x 
            <button onClick={() => props.handleRemove(props.item)}>Remove</button>
        </li>
    );
}

export default ItemCard;