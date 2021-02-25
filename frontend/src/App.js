import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// user-defined components
import Login from './login'
import Home from './home'
import PrivateRoute from './private-route'
import { ProvideAuth } from './use-auth.js'
import { ProvideCore } from './use-core.js'

// CSS
import './App.css';

function App(props) {
  return (
    <ProvideAuth>
      <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <ProvideCore>
                <Home />
              </ProvideCore>
            </PrivateRoute>
          </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
