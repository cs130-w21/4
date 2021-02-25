// Credits: https://reactrouter.com/web/example/auth-workflow

import React, { useEffect } from 'react'
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from './use-auth';

export default function PrivateRoute({children, ...rest}) {
  const auth = useAuth();

  useEffect(() => {
    const refreshPage = async () => {
      let response = await auth.refresh();
      if (! response) {
        console.log("refresh didn't work");
      }
      else {
        console.log("refresh worked");
        console.log(response);
      }
    };

    refreshPage();
  }, []);

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
