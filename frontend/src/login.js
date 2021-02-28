import React, {
  useState
} from "react";

import { useAuth } from "./use-auth.js"

/**
 * @param props
 * @return returns the rendering of the login page (a submit buttons and
 * 2 input forms; one for username, one for password.
 * @constructor
 *
 * Purpose: to collect the user's login credentials via
 * the input form, then send said credentials to use-auth.js
 * to verify thus allowing the user to login & view their
 * personal network (given their credentials are correct)
 */
export default function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  /**
   * @param evt - a trigger that sends the signal to initiate
   * the new contact submission process.
   * @return {Promise<void>}
   *
   * Purpose: to submit the user's login credentials for review
   * then upon response either let the user enter the web app
   * or inform them their credentials were denied
   */
  // TODO: submit request to server
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = await auth.login(username, password);
    if (response) {
        // nothing for now
    }

    // TODO: display error message on permission denied
    else {
      console.log("Permission denied");
    }
  }

  /* user login form */
  return (
    <div>
      <form onSubmit={evt => handleSubmit(evt)}>
        <label>
          <input type="text" name="username" value={username} placeholder="username" onChange={(evt) => setUsername(evt.target.value)} />
        </label>
        <label>
          <input type="password" name="password" value={password} placeholder="password" onChange={(evt) => setPassword(evt.target.value)} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
