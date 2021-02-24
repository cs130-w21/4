// Credits: https://reactrouter.com/web/example/auth-workflow

import React, { useEffect } from 'react'
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from './use-auth';

export default function PrivateRoute({children, ...rest}) {
  const auth = useAuth();

  // useEffect(() => {
  //
  //   // if we already have a user object, continue as normal
  //   if (auth.user) {
  //     return;
  //   }
  //
  //   // if we don't yet have a user object, check if we are signed in
  //   const getCore = async () => {
  //     const result = await fetch("/api/core", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Credentials': 'include'
  //       }
  //     })
  //     .then(response => response.json())
  //     .catch(err => {
  //
  //       // remove authentication and redirect to login page
  //       if (err.status === 401) {
  //         auth.setUser(null);
  //       }
  //     });
  //
  //     console.log("HEREHEREHERE");
  //
  //     console.log(result.userObject);
  //
  //     auth.setUser(result.userObject);
  //     console.log(auth.user);
  //   };
  //
  //   getCore();
  // },
  // // empty dependency array that way the effect is only triggered on component rendering
  // []);

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
