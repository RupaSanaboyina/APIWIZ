import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [path, setPath] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter JSON path (e.g. $.user.address.city)"
        value={path}
        onChange={(e) => setPath(e.target.value)}
      />
      <button onClick={() => onSearch(path)}>Search</button>
    </div>
  );
}

export default SearchBar;
