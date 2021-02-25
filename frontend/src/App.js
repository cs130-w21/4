import React from 'react';

// user-defined components
import AuthenticationRouting from './authentication-routing';
import { ProvideAuth } from './use-auth';

// CSS
import './App.css';

function App(props) {
  return (
    <ProvideAuth>
      <AuthenticationRouting />
    </ProvideAuth>
  );
}

export default App;
