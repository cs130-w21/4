import React from 'react'

export default class NavBar extends React.Component {

  render() {
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
      </div>
    )
  }

}
