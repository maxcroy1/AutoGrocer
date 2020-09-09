import React from 'react';
import { connect } from 'react-redux';

class PaymentMethod extends React.Component {
    state = {}

    render() {
        return (
            <div className="py-3">
                <h3>Payment Method</h3>
                <p><strong>Credit or Debit Card: </strong>ends in { this.props.card.slice(-4) }, exp. { `${this.props.exp_month}/${this.props.exp_year}` }</p>
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
        card: state.user.info.billing_settings.card_num,
        street_address: state.user.info.billing_settings.street_address,
        city: state.user.info.billing_settings.city,
        state: state.user.info.billing_settings.state,
        zipcode: state.user.info.billing_settings.zipcode,
        exp_month: state.user.info.billing_settings.exp_month,
        exp_year: state.user.info.billing_settings.exp_year
    }
}

export default connect(mapStateToProps)(PaymentMethod);