import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import AccountSettings from '../components/AccountSettings';
import BillingSettings from '../components/BillingSettings'

const Registration = (props) => {
    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <h1>Sign Up</h1>
            <Switch>
                <Route exact path={`${path}/account_settings`}>
                    { props.user ? <Redirect to={`${path}/billing_preferences`} /> :<AccountSettings /> }
                </Route>
                <Route exact path={`${path}/billing_preferences`}>
                    { props.registration_complete ? <Redirect to={`/shop`} /> :<BillingSettings /> }
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/account_settings`} />
                </Route>
            </Switch>
        </div>
    );
}

let mapStateToProps = (state) => {
    return { 
        user: state.user,
        registration_complete: state.registration_complete 
    };
};

export default connect(mapStateToProps)(Registration);