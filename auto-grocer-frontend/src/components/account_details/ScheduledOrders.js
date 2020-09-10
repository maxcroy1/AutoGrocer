import React from 'react';
import { connect } from 'react-redux';
import OrderCard from './order_info/OrderCard';

class ScheduledOrders extends React.Component {

    render() {
        return (
            <div>
                <h3>Scheduled Orders</h3>
                {this.props.orders.map(order => <OrderCard order={order}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.user.info.orders
    }
}

export default connect(mapStateToProps)(ScheduledOrders);