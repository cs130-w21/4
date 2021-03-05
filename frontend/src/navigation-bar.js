import React from 'react'
import { useAuth } from './use-auth'
import Button from "react-bootstrap/Button";
import logo from './mpn_logo.png';

/**
 *
 * @param props
 * @return {JSX.Element} returns the rendering associated with
 * homepage's navigation bar.
 * @constructor
 *
 * Purpose: to allow the user to view the navigation bar
 * (including the application logo) and interact with
 * the logout button
 */
export default function NavBar(props) {

  const auth = useAuth();

  const handleLogout = async () => {
    let response = await auth.logout();
    if (response) {
      // successful logout
    }
    else {
      // UNsuccessful logout
    }
  };

  return (
    <div className="Nav-bar">
        <img alt="logo" className="NetworkLogo" src={logo} />
        <div>
            <span>
                <Button variant="info" onClick={handleLogout}>
                    Sign Out
                </Button>
            </span>
        </div>
    </div>
  )
}