// Credits: https://reactrouter.com/web/example/auth-workflow

import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from './use-auth';

export default function PrivateRoute({children, ...rest}) {
  const auth = useAuth();

  if (auth.user === null) {
    // TODO: determine a way to see if we already have a session established
  }

  return (
    <Route
      {...rest}
      render={() =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );

}
