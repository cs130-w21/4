// Credits: https://reactrouter.com/web/example/auth-workflow

import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from './use-auth';

export default function PrivateRoute({children, ...rest}) {
  let auth = useAuth();
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
