// Credits: https://usehooks.com/useAuth/

import React, {
  useState,
  useContext,
  createContext
} from "react";

const auth = {
  user: null,
  async login(username, password) {
    // send request to backend
    return { user: username }; // for now
  },
  async logout() {
    // send request to backend
    return { user: null }; // for now
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
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    return auth.login(username, password)
    .then(response => {
      // this response contains the entire user network??
      // or send separate request for network data??
      setUser(response.user)
      return response;
    });
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
    login,
    logout
  };
}
