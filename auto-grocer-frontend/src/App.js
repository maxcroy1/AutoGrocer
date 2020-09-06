import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { registerUser } from './actions/auth';
import { completeRegistration } from './actions/registration';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Registration';
import Shop from './containers/Shop';
import OrderComplete from './containers/OrderComplete';
import AccountDetails from './containers/AccountDetails';

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('ag_token')) {
      console.log('its here')
      this.props.registerUser(localStorage.getItem('ag_token'));
    }
  }

  render() {
    return (
      <Router>
        <NavBar />
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/login'>
              { this.props.user.token ? <Redirect to='/shop' /> : <Login /> }
            </Route>
            <Route path='/register'>
              { this.props.registration_complete ? <Redirect to='/shop' /> : <Registration /> }
            </Route>
            <Route path='/shop'>
            { this.props.user.token ? <Shop /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path='/order_complete'>
              <OrderComplete />
            </Route>
            <Route path='/account_details'>
              <AccountDetails />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { 
    user: state.user,
    registration_complete: state.registration_complete 
  };
};

let mapDispatchToProps = dispatch => {
  return {
    registerUser: (token) => {
      dispatch(registerUser(token))
    },
    completeRegistration: () => {
      dispatch(completeRegistration())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
