import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home'
import Login from './containers/Login'
import Registration from './containers/Registration'

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
