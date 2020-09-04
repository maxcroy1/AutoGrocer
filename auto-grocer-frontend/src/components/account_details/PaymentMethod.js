import React from 'react';
import { connect } from 'react-redux';

class PaymentMethod extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <h2>Payment Method</h2>
                <p><strong>Credit or Debit Card: </strong>ends in { this.props.card }, exp. { this.props.expiration }</p>
                <button>Edit</button>
                <h3>Billing Address:</h3>
                <p>
                    {this.props.street_address}<br />
                    {this.props.city}, {this.props.state}<br />
                    {this.props.zipcode}
                </p>
                <button>Edit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        card: state.user.billing_settings.card_num,
        street_address: state.user.billing_settings.street_address,
        city: state.user.billing_settings.city,
        state: state.user.billing_settings.state,
        zipcode: state.user.billing_settings.zipcode,
        expiration: state.user.billing_settings.expiration
    }
}

export default connect(mapStateToProps)(PaymentMethod);