import React, {
  useState
} from "react";
import {
  useHistory,
} from "react-router-dom";

import { useAuth } from "./use-auth.js"

export default function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const auth = useAuth();

  // TODO: submit request to server
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = await auth.login(username, password);
    console.log(response);
    console.log(auth);
    if (response.user) {
      history.push("/"); // redirect to home page
    }
  }

  return (
    <div>
      <form onSubmit={evt => handleSubmit(evt)}>
        <label>
          <input type="text" name="username" value={username} placeholder="username" onChange={(evt) => setUsername(evt.target.value)} />
        </label>
        <label>
          <input type="password" name="password" value={password} placeholder="password" onChange={(evt) => setPassword(evt.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
