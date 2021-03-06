// Credits: https://reactrouter.com/web/example/auth-workflow

import React, { useEffect } from 'react'
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from './use-auth';

/**
 * Private-route component
 * @module 
 */

/**
 * Purpose: to route the user to the login page.
 * @param children
 * @param rest
 * @return returns the route to the login page
 */
export default function PrivateRoute({children, ...rest}) {
  const auth = useAuth();

  // useEffect(() => {
  //   const refreshPage = async () => {
  //     let response = await auth.refresh();
  //     if (! response) {
  //       console.log("refresh didn't work");
  //     }
  //     else {
  //       console.log("refresh worked");
  //       console.log(response);
  //     }
  //   };
  //
  //   refreshPage();
  // }, []);

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
