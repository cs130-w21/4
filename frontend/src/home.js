import React, { useEffect } from 'react'

// user-defined components
import ContactList from './contact-list'
import NavBar from './navigation-bar'
import FilterBar from './filter-bar'
import { useCore } from './use-core'

export default function Home(props) {

  const core = useCore();

  useEffect(() => {

    const retrieveCore = async () => {
      let response = await core.getCore();
      if (! core) {
        // console.log("didn't work");
      }
      else {
        // console.log(core.coreObject);
      }
    }

    retrieveCore();
  }, []);

  return (
    <div className="Home">
      <header className="App-header">
        <NavBar />
        <FilterBar />
        <ContactList />
      </header>
    </div>
  )

}
