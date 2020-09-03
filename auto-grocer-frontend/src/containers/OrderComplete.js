import React from 'react';
import { connect } from 'react-redux';

class OrderComplete extends React.Component {
    render() {
        return (
            <div>
                <h1>Your order is complete</h1>
                <p>Enjoy your groceries!</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order.id
    }
}

export default connect(mapStateToProps)(OrderComplete);