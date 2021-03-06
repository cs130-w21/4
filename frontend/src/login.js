import React, {
  useState
} from "react";

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import logo from './mpn_logo.png';

import { useAuth } from "./use-auth.js"

/**
 * Login component
 * @module
 */

/**
 * Purpose: to collect the user's login credentials via
 * the input form, then send said credentials to use-auth.js
 * to verify thus allowing the user to login & view their
 * personal network (given their credentials are correct)
 * @param props
 * @return returns the rendering of the login page (a submit buttons and
 * 2 input forms; one for username, one for password.
 */
export default function Login(props) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const auth = useAuth();

  const handleLogin = async (evt) => {
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

  const handleShowMenu = (evt) => {
    evt.preventDefault();
    setShowMenu(true);
  }

  const handleRegisterUser = async (evt, userObject) => {
    evt.preventDefault();
    let success = await auth.register(userObject);
    if (success) {
      setShowMenu(false);
    }

    // TODO: display error message on permission denied
    else {
      console.log("Unable to create new account");
    }
  }

  return (
    <div className="Login-page">
      <img alt="logo" className="NetworkLogoLogin" src={logo} />
      <div>
        <form onSubmit={evt => handleLogin(evt)}>
          <div>
            <label>
              <input type="text" name="username" value={username} placeholder="username" onChange={(evt) => setUsername(evt.target.value)} />
            </label>
          </div>
          <div>
            <label>
              <input type="password" name="password" value={password} placeholder="password" onChange={(evt) => setPassword(evt.target.value)} />
            </label>
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
          <div className="Create-account">
          <form onSubmit={evt => handleShowMenu(evt)}>
            <input type="submit" value="Create New Account" />
          </form>
        </div>
      </div>
      <RegisterUserMenu show={showMenu} onHide={()=> setShowMenu(false)} onRegister={handleRegisterUser} />
    </div>
  );
}

/**
 * Purpose: to allow the user to view the registration
 * form and input their information within it
 * @param onRegister - a flag that will signal the
 * need to interact with handleRegisterUser
 * @param rest - assists with handling of the modal
 * @return {JSX.Element} returns the rendering of the
 * new user registration form
 */
function RegisterUserMenu({onRegister, ...rest}) {

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" centered>
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={evt => onRegister(evt, {first, last, email, username, password})}>
          <div>
            <div>
              <InputGroup>
                <FormControl
                    type="text"
                    name="first"
                    value={first}
                    placeholder="First Name"
                    onChange={(evt) => setFirst(evt.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup>
                <FormControl
                    type="text"
                    name="last"
                    value={last}
                    placeholder="Last Name"
                    onChange={(evt) => setLast(evt.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup>
                <FormControl
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={(evt) => setEmail(evt.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup>
                <FormControl
                    type="text"
                    name="username"
                    value={username}
                    placeholder="username"
                    onChange={(evt) => setUsername(evt.target.value)}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup>
                <FormControl
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={(evt) => setPassword(evt.target.value)}
                />
              </InputGroup>
            </div>
          </div>
          <div>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
