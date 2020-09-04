import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './order_info/OrderCard';

class ScheduledOrders extends React.Component {

    render() {
        return (
            <div>
                <h2>Scheduled Orders</h2>
                {this.props.orders.map(order => <OrderCard order={order}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.user.orders
    }
}

export default connect(mapStateToProps)(ScheduledOrders);