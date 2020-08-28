import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import Login from './containers/Login'
import Registration from './containers/Registration'
import Shop from './containers/Shop'
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/login'>
              { this.props.user ? <Redirect to='/shop' /> : <Login /> }
            </Route>
            <Route path='/register'>
              <Registration />
            </Route>
            <Route path='/shop'>
            { this.props.user ? <Shop /> : <Redirect to="/login" /> }
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(App);
