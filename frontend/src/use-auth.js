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
  },
  async refresh() {
    let response = await fetch("/api/core", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      }
    })
    .then(response => response.json())
    .catch(err => {
      if (err.status === 401) {
        return null;
      }
      return null;
    });

    return response;
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

  const refresh = () => {
    return auth.refresh()
    .then(response => {
      if (response === null) {
        return null;
      }

      setUser(response.userObject);
      return response;
    })
  };

  return {
    user,
    login,
    logout,
    refresh
  };
}
