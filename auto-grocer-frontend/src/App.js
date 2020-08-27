import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import Login from './containers/Login'
import Registration from './containers/Registration'
import Shop from './containers/Shop'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Registration />
          </Route>
          <Route path='/shop'>
            <Shop />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
