import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import AccountInformation from '../components/account_details/AccountInformation';
import PaymentMethod from '../components/account_details/PaymentMethod';
import ScheduledOrders from '../components/account_details/ScheduledOrders';
import InstacartCredentials from '../components/account_details/InstacartCredentials';
import PersonalInformation from '../components/account_details/PersonalInformation';

const AccountDetails = (props) => {
    let path = useRouteMatch();

    return (
        <div>
            <h1>Account Details</h1>
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
                <button>Account Information</button>
                <button>Personal Information</button>
                <button>Payment Method</button>
                <button>Instacart Credentials</button>
                <button>Scheduled Orders</button>
            </div>
        </div>
    );
}

export default AccountDetails;