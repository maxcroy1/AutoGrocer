import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountSettings from '../components/registration/AccountSettings';
import BillingSettings from '../components/registration/BillingSettings';

const Registration = (props) => {
    let { path } = useRouteMatch();

    return (
        <div>
            <h1>Sign Up</h1>
            <Switch>
                <Route exact path={`${path}/account_settings`}>
                    { props.user.token ? <Redirect to={`${path}/billing_preferences`} /> :<AccountSettings /> }
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