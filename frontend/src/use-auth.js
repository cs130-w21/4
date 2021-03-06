import React, {
  useState,
  useContext,
  createContext
} from "react";

/**
 * Use-auth component
 * @module 
 */

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
    let response = await fetch("/api/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      }
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      }
      else {
        return false;
      }
    })
    .catch(err => {
      if (err.status === 500) {
        return false;
      }
      return false;
    });

    return response;
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
  },
  async register(userObject) {
    let response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Credentials': 'include'
      },
      body: JSON.stringify(userObject)
    })
    .then(response => {
      if (response.status === 200) {
        return true;
      }
      else {
        return false;
      }
    })
    .catch(err => {
      if (err.status === 401) {
        return false;
      }
      return false;
    });

    return response;
  }
}

const authContext = createContext();

/**
 * Purpose: to get the authentication object which is needed
 * to allow the user to enter and use the web app
 * @return returns the authentication required
 * for login, logout, session cookies, etc
 */
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

/**
 * Purpose: to use the authentication object to allow the
 * user to login to the web app
 * @return returns the response from the login attempt, or
 * null if the attempt was successful.
 */
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
    .then(didLogout => {
      if (didLogout) {
        setUser(null);
      }
      else {
        // do something maybe??
      }

      return didLogout;
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
    });
  };

  const register = (userObject) => {
    return auth.register(userObject)
    .then(didRegister => {
      if (didRegister) {
        setUser(userObject);
      }

      return didRegister;
    });
  }

  return {
    user,
    login,
    logout,
    refresh,
    register
  };
}
