import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Confirmation extends React.Component {
    // handleConfirmation = () => {
    //     let path = '/order_complete';
    //     let history = useHistory();
    //     history.push(path);
    // }

    render() {
        return (
            <div>
                <h1>Order Confirmation</h1>
                <p>Your groceries will be delivered every <strong>{this.props.day}</strong> between <strong>{this.props.time}</strong>.</p>
                <p><strong>Delivery Address:</strong></p>
                <p>{this.props.address_one}<br />{this.props.address_two}<br />{this.props.zipcode}</p>
                <p><strong>Delivery Instructions:</strong><br />{this.props.instructions}</p>
                <p><strong>Contact Number:</strong><br />{this.props.phone}</p>
                <p><strong>Items in Cart:</strong></p>
                <ul>
                    {this.props.items.map(item => <li>{item.name} x{item.quantity}</li>)}
                </ul>
                <button><Link to='/order_complete'>Confirm Order</Link></button>
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

export default connect(mapStateToProps)(Confirmation);