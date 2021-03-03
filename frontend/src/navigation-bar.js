import React, { useState } from 'react'
import { useAuth } from './use-auth'
import { useCore } from './use-core.js';

export default function NavBar(props) {

  const auth = useAuth();
  let core = useCore();
  const contacts = core.coreObject.networkObject.contacts;
  const [input, setInput] = useState('');

  const handleLogout = async () => {
    let response = await auth.logout();
    if (response) {
      // successful logout
    }
    else {
      // UNsuccessful logout
    }
  };

  const updateInput = async (input) => {
    const filtered = contacts.filter(contact => {
      console.log('contact', contact)
     return contact.first.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    console.log("hah", filtered)
 }

  return (
    <div className="Nav-bar">
      <span className="Nav-bar-title">Summer's Personal Network</span>
      <SearchBar
        input={input}       
        setKeyword={updateInput}
      />
      <div>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </div>
  )

}

const SearchBar = ({input, setKeyword}) => {
  return (
    <span class="search-container">
      <input
        className="Search-bar"
        key="random1"
        value={input}
        placeholder={" Search.."}
        onChange={(e) => setKeyword(e.target.value)}
      />
  </span>
  );
}