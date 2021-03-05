import React from 'react'
import { useAuth } from './use-auth'
import Button from "react-bootstrap/Button";
import logo from './mpn_logo.png';

/**
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
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
        <div style={{float: 'right'}}>
            <span>
                <Button variant="info" onClick={handleLogout}>
                    Sign Out
                </Button>
            </span>
        </div>
    </div>
  )
}