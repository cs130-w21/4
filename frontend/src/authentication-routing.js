import React, { useEffect, useState } from 'react';
import { useAuth } from './use-auth';
import Login from './login';
import Home from './home';
import { ProvideCore } from './use-core';

export default function AuthenticationRouting(props) {

  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {

    setLoading(true);

    const refreshPage = async () => {
      let response = await auth.refresh();
      if (! response) {
        // console.log("refresh didn't work");
      }
      else {
        // console.log("refresh worked");
        // console.log(response);
      }

      setLoading(false);
    };

    refreshPage();
  }, []);

  return (
    loading ? (
      <div>Loading...</div>
    ) : (
      auth.user ? (
        <ProvideCore>
          <Home />
        </ ProvideCore>
      ) : (
        <Login />
      )
    )
  );
}
