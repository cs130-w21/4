import React from 'react'

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