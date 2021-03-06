import React, { useEffect, useState } from 'react'

// user-defined components
import ContactList from './contact-list'
import NavBar from './navigation-bar'
import FilterBar from './filter-bar'
import { useCore } from './use-core'
import LoadingPage from './loading-page'

/**
 *
 * @param props
 * @return {JSX.Element} returns the rendering associated with
 * viewing the homepage of the web application
 * @constructor
 *
 * Purpose: to provide the user a view of the web application's
 * homepage after getting through the login and loading pages
 */
export default function Home(props) {

  const [loading, setLoading] = useState(true);

  /*Drop-down sorting menu handling*/
  const [forwards, setForwards] = useState(true);
  const [orderBy, setOrderBy] = useState("first");

  const handleSortChange = (forward) => {
    setForwards(forward);
  }

  const handleOrderChange = (index) => {
    setOrderBy(index);
  }

  const core = useCore();

  useEffect(() => {

    setLoading(true);

    const retrieveCore = async () => {
      let response = await core.getCore();
      if (! core) {
        // console.log("didn't work");
      }
      else {
        // console.log(core.coreObject);
      }

      setLoading(false);
    };

    retrieveCore();
  }, []);

  return (

    loading ? (
      <LoadingPage />
    ) : (
      <div className="Home">
        <header className="App-header">
          <NavBar />
          <FilterBar handleOrderChange={handleOrderChange} handleSortChange={handleSortChange} sort={{forwards, orderBy}} />
          <ContactList sort={{forwards, orderBy}} />
        </header>
      </div>
    )
  )
}
