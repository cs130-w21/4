import React, { useEffect, useState } from 'react'
import {
  useHistory,
} from "react-router-dom";

// user-defined components
import ContactList from './contact-list'
import NavBar from './navigation-bar'
import FilterBar from './filter-bar'
import { useAuth } from './use-auth'

export default function Home(props) {

  const [core, setCore] = useState(null);

  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    const getCore = async () => {
      const result = await fetch("http://localhost:4001/api/core", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .catch(err => {

        // remove authentication and redirect to login page
        if (err.status === 401) {
          auth.setUser(null);
          history.push("/login");
        }
      });

      console.log(result);

      setCore(result);
    };

    getCore();
  },
  // empty dependency array that way the effect is only triggered on component rendering
  []);

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
