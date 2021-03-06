import React from 'react';
import { Button } from 'react-bootstrap';

function ItemCard(props) {
    return (
        <li style={{listStyleType: 'none'}}>
            <img src={props.item.img_url} height="150px" style={{paddingRight: "50px"}} />
            <strong>{props.item.name}</strong> {props.item.quantity}x
            <Button style={{marginLeft: "50px"}} variant="secondary" size="sm" onClick={() => props.handleRemove(props.item)}>Remove</Button>
        </li>
    );
}

export default ItemCard;