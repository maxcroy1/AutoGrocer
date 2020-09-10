import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { orderComplete } from '../../actions/order';
import { deliveryComplete } from '../../actions/delivery';

class Confirmation extends React.Component {

    handleConfirmation = () => {
        this.props.orderComplete();
    }

    getTotal = () => {
        let pricesPerItem = this.props.items.map(item => parseFloat(item.price.split(' ')[0].split('$')[1]) * item.quantity)
        let newTotal = pricesPerItem.reduce((a, b) => a + b, 0)
        let finalTotal = newTotal.toFixed(2)
        return finalTotal
    }

    render() {
        return (
            <div>
                <h3>Order Confirmation</h3>
                <p>Your groceries will be delivered every <strong>{this.props.day}</strong> between <strong>{this.props.time}</strong>.</p>
                <p><strong>Delivery Address:</strong><br />{this.props.address_one}<br />{this.props.address_two}<br />{this.props.zipcode}</p>
                <p><strong>Delivery Instructions:</strong><br />{this.props.instructions}</p>
                <p><strong>Contact Number:</strong><br />{this.props.phone}</p>
                <p><strong>Order Total:</strong><br />${this.getTotal()}</p>
                <p><strong>Items in Cart:</strong></p>
                <ul>
                    {this.props.items.map(item => <li style={{listStyleType: 'none'}} key={item.name}><img src={item.img_url} height="150px" style={{paddingRight: "50px"}} /> {item.name} x{item.quantity}</li>)}
                </ul>
                <br />
                <Button variant="success"><Link to='/order_complete' onClick={this.handleConfirmation} className="button-link">Confirm Order</Link></Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        day: state.delivery.day,
        time: state.delivery.time,
        address_one: state.delivery.address_one,
        address_two: state.delivery.address_two,
        zipcode: state.delivery.zipcode, 
        phone: state.delivery.phone,
        instructions: state.delivery.instructions,
        items: state.order.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderComplete: () => {
            dispatch(orderComplete())
        },
        deliveryComplete: () => {
            dispatch(deliveryComplete())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);