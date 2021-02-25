import React, { useEffect } from 'react'
import { useAuth } from './use-auth';
import Login from './login';
import Home from './home';
import { ProvideCore } from './use-core';

export default function PrivateRoute(props) {
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
    auth.user ? (
      <ProvideCore>
        <Home />
      </ ProvideCore>
    ) : (
      <Login />
    )
  );
}
