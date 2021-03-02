import React from 'react'
import { useAuth } from './use-auth'

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
      <span class="search-container">
        <form action="/action_page.php">
          <input
            className="Search-bar"
            key="random1"
            // value={keyword}
            placeholder={" Search.."}
            // onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </span>
      <div>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  )

}
