import React from 'react';
import { Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AccountInformation from '../components/account_details/AccountInformation';
import PaymentMethod from '../components/account_details/PaymentMethod';
import ScheduledOrders from '../components/account_details/ScheduledOrders';
import InstacartCredentials from '../components/account_details/InstacartCredentials';
import PersonalInformation from '../components/account_details/PersonalInformation';

const AccountDetails = (props) => {
    let { path } = useRouteMatch();

    return (
        <Container className="py-3">
            <h1>Account Details</h1>
            <NavLink to={`${path}/account_information`} className="pr-2">Account Information</NavLink>
            <NavLink to={`${path}/personal_information`} className="pr-2">Personal Information</NavLink>
            <NavLink to={`${path}/payment_method`} className="pr-2">Payment Method</NavLink>
            <NavLink to={`${path}/instacart_credentials`} className="pr-2">Instacart Credentials</NavLink>
            <NavLink to={`${path}/scheduled_orders`} className="pr-2">Scheduled Orders</NavLink>
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
        </Container>
    );
}

export default AccountDetails;