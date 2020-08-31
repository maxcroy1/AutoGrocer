import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar'
import ItemSelection from '../components/ItemSelection'
import DeliveryPreferences from '../components/DeliveryPreferences'

const Shop = (props) => {

    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <h1>Let's shop!</h1>
            <Switch>
                <Route exact path={`${path}/item_selection`}>
                    {props.selection_complete ? <Redirect to={`${path}/delivery_preferences`} /> : <ItemSelection /> }
                </Route>
                <Route exact path={`${path}/delivery_preferences`}>
                    {props.delivery_pref_complete ? <Redirect to={`${path}/confirmation`} /> : <DeliveryPreferences /> }
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/item_selection`} />
                </Route>
            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        selection_complete: state.order.selection_complete,
        delivery_pref_complete: state.delivery.time
    }
}

export default connect(mapStateToProps)(Shop);