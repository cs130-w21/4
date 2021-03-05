import React from 'react'
import { useAuth } from './use-auth'

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
      <span className="Nav-bar-title">Summer's Personal Network</span>
      <span>
        <button onClick={handleLogout}>Sign Out</button>
      </span>
    </div>
  )
}