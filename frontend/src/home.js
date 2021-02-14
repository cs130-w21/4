import React from 'react'

// user-defined components
import ContactList from './contact-list'
import NavBar from './navigation-bar'
import FilterBar from './filter-bar'

export default class Home extends React.Component {

  render() {
    return (
      <div class="Home">
        <header className="App-header">
          <NavBar />
          <FilterBar />
          <ContactList />
        </header>
      </div>
    )
  }

}
