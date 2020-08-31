import React from 'react';
import { connect } from 'react-redux'

class Confirmation extends React.Component {
    handleConfirmation = () => {
        window.location.assign('/order_complete')
    }

    render() {
        return (
            <div>
                <h1>Order Confirmation</h1>
                <p>Your groceries will be delivered every <strong>{this.props.day}</strong> between <strong>{this.props.time}</strong>.</p>
                <h2>Delivery Address:</h2>
                <p>{this.props.address_one}<br />{this.props.address_two}<br />{this.props.zipcode}</p>
                <p><strong>Delivery Instructions:</strong><br />{this.props.instructions}</p>
                <p><strong>Contact Number:</strong><br />{this.props.phone}</p>
                <button onClick={this.handleConfirmation}>Confirm Order</button>
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
        instructions: state.delivery.instructions
    }
}

export default connect(mapStateToProps)(Confirmation);