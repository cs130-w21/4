import React from 'react';

// user-defined components
import AuthenticationRouting from './authentication-routing';
import { ProvideAuth } from './use-auth';

// CSS
import './App.css';

/**
 * React app
 * @module 
 */

/**
 * Purpose: to provide a path for the user to enter the
 * login aspect of the application
 * @param {object} props
 * @return {JSX.Element} returns the route which allows the
 * user to get to the login
 */
function App(props) {
  return (
    <ProvideAuth>
      <AuthenticationRouting />
    </ProvideAuth>
  );
}

export default App;
