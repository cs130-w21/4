import React from 'react'

/**
 * Search-bar component
 * @module 
 */

/**
 * Purpose: to allow the user to interact with the rendered
 * search bar, which in turn allows them to search through
 * their contacts
 * @param input - the user's desired search term
 * @param setKeyword - sets the search term
 * @return {JSX.Element} returns the rendering associated
 * with the search bar
 */
export default function SearchBar({input, setKeyword}) {
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