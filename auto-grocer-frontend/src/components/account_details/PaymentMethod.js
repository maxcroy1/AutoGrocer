import React from 'react';

class PaymentMethod extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <h2>Payment Method</h2>
                <p><strong>Credit or Debit Card:</strong></p>
                <button>Edit</button>
                <h3>Billing Address:</h3>
                <button>Edit</button>
            </div>
        );
    }
}

export default PaymentMethod;