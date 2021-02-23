// Credits: https://usehooks.com/useAuth/

import React, {
  useState,
  useContext,
  createContext
} from "react";

// this auth can be replaced with anything that provides the same API
// could be extracted to separate file
const auth = {
  user: null,
  async login(username, password) {
    // send request to backend
    let response = await fetch("http://localhost:4001/api/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => {

      console.log(response);

      return response.json()
    })
    .catch(err => {
      if (err.status === 401) {
        return null;
      }
    });

    // should be userObject
    return response;
  },
  async logout() {
    // TODO: link this with the backend
    return { user: null };
  }
}

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      { children }
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {

  const [user, setUser] = useState({});

  const login = (username, password) => {
    return auth.login(username, password)
    .then(response => {
      if (response === null) {
        return null;
      }

      setUser(response)
      return response;
    })
  };

  const logout = ()  => {
    return auth.logout()
    .then(response => {
      // set the user to null
      setUser(false);
    });
  };

  return {
    user,
    setUser,
    login,
    logout
  };
}
