import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
                    {props.order.length > 0 ? <Redirect to={`${path}/delivery_preferences`} /> : <ItemSelection /> }
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/item_selection`} />
                </Route>
            </Switch>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {order: state.order}
}

export default connect(mapStateToProps)(Shop);