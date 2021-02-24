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
  setUser: null,
  async login(username, password) {
    // send request to backend
    let response = await fetch("/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => response.json())
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

  const [user, setTheUser] = useState();

  const login = (username, password) => {
    return auth.login(username, password)
    .then(response => {
      if (response === null) {
        return null;
      }

      setTheUser(response)
      return response;
    })
  };

  const logout = ()  => {
    return auth.logout()
    .then(response => {
      // set the user to null
      setTheUser(false);
    });
  };

  const setUser = (userObject) => {
    setTheUser(userObject);
  };

  return {
    user,
    setUser,
    login,
    logout
  };
}
