import React from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import AccountInformation from '../components/account_details/AccountInformation';
import PaymentMethod from '../components/account_details/PaymentMethod';
import ScheduledOrders from '../components/account_details/ScheduledOrders';
import InstacartCredentials from '../components/account_details/InstacartCredentials';
import PersonalInformation from '../components/account_details/PersonalInformation';

const AccountDetails = (props) => {
    let { path } = useRouteMatch();

    return (
        <div>
            <h1>Account Details</h1>
            <NavLink to={`${path}/account_information`}>Account Information</NavLink>
            <NavLink to={`${path}/personal_information`}>Personal Information</NavLink>
            <NavLink to={`${path}/payment_method`}>Payment Method</NavLink>
            <NavLink to={`${path}/instacart_credentials`}>Instacart Credentials</NavLink>
            <NavLink to={`${path}/scheduled_orders`}>Scheduled Orders</NavLink>
            <div>
                <Switch>
                    <Route exact path={`${path}/account_information`}>
                        <AccountInformation />
                    </Route>
                    <Route exact path={`${path}/personal_information`}>
                        <PersonalInformation />
                    </Route>
                    <Route exact path={`${path}/payment_method`}>
                        <PaymentMethod />
                    </Route>
                    <Route exact path={`${path}/instacart_credentials`}>
                        <InstacartCredentials />
                    </Route>
                    <Route exact path={`${path}/scheduled_orders`}>
                        <ScheduledOrders />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default AccountDetails;