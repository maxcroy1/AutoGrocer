import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ItemSelection from '../components/shop/ItemSelection';
import DeliveryPreferences from '../components/shop/DeliveryPreferences';
import Confirmation from '../components/shop/Confirmation';

function Shop(props) {

    let { path } = useRouteMatch();

    return (
        <Container className="py-3">
            <Switch>
                <Route exact path={`${path}/item_selection`}>
                    <ItemSelection />
                </Route>
                <Route exact path={`${path}/delivery_preferences`}>
                    {props.items.length === 0 ? <Redirect to={`${path}/item_selection`} /> : <DeliveryPreferences /> }
                </Route>
                <Route exact path={`${path}/confirmation`}>
                    <Confirmation />
                </Route>
                <Route exact path={`${path}`}>
                    <Redirect to={`${path}/item_selection`} />
                </Route>
            </Switch>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        items: state.order.items
    }
}

export default connect(mapStateToProps)(Shop);