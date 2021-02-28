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

/**
 * @return returns the authentication required
 * for login, logout, session cookies, etc
 *
 * purpose: to get the authentication object which is needed
 * to allow the user to enter and use the web app
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
 * @return returns the response from the login attempt, or
 * null if the attempt was successful.
 *
 * purpose: to use the authentication object to allow the
 * user to login to the web app
 */
function useProvideAuth() {

  const [user, setUser] = useState(null);

  /**
   * @param username - user's username, attained from user input
   * within the login page
   * @param password - user's password, attained from user input
   * within the login page
   * @return the result of the login or null if the login was unsuccessful
   *
   * Purpose: to allow a registered user access to their personal network
   */
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

  /**
   * @return logout promise
   *
   * Purpose: to log the user out which will then
   * allow another, or the same user, to log in again
   */
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
