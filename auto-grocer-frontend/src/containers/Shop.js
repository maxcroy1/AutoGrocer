import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import ItemSelection from '../components/ItemSelection';
import DeliveryPreferences from '../components/DeliveryPreferences';
import Confirmation from '../components/Confirmation';

function Shop() {

    let { path } = useRouteMatch();

    return (
        <div>
            <h1>Let's shop!</h1>
            <Switch>
                <Route exact path={`${path}/item_selection`}>
                    <ItemSelection />
                </Route>
                <Route exact path={`${path}/delivery_preferences`}>
                    <DeliveryPreferences />
                </Route>
                <Route exact path={`${path}/confirmation`}>
                    <Confirmation />
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/item_selection`} />
                </Route>
            </Switch>
        </div>
    );
}

export default Shop;