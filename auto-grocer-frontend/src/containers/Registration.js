import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AccountSettings from '../components/AccountSettings';

function Registration() {
    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <h1>Sign Up</h1>
            <Switch>
                <Route exact path={`${path}/account_settings`}>
                    <AccountSettings />
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/account_settings`} />
                </Route>
                {/* <Route path={`${match.url}/billing_preferences`}>

                </Route> */}
            </Switch>
        </div>
    );
}

export default Registration;