import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar'
import ItemSelection from '../components/ItemSelection'

const Shop = (props) => {

    let { path } = useRouteMatch();

    return (
        <div>
            <Navbar />
            <h1>Let's shop!</h1>
            <Switch>
                <Route exact path={`${path}/item_selection`}>
                    <ItemSelection />
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/item_selection`} />
                </Route>
            </Switch>
        </div>
    );
}

export default Shop;