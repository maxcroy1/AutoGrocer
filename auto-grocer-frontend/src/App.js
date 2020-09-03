import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { logIn } from './actions/auth';
import { completeRegistration } from './actions/registration';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Registration';
import Shop from './containers/Shop';
import OrderComplete from './containers/OrderComplete';

class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('ag_token')) {
      this.props.logIn(localStorage.getItem('ag_token'));
      this.props.completeRegistration();
    }
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/login'>
              { this.props.user ? <Redirect to='/shop' /> : <Login /> }
            </Route>
            <Route path='/register'>
              { this.props.registration_complete ? <Redirect to='/shop' /> : <Registration /> }
            </Route>
            <Route path='/shop'>
            { this.props.user ? <Shop /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path='/order_complete'>
              <OrderComplete />
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
    logIn: (token) => {
      dispatch(logIn(token))
    },
    completeRegistration: () => {
      dispatch(completeRegistration())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
