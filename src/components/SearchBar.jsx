import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleInput = (e) => {
    setText(e.target.value);
    onSearch(e.target.value); // send search text to Home page
  };

  return (
    <div className="mt-10 mb-8 flex justify-center">
      <input
        type="text"
        value={text}
        onChange={handleInput}
        placeholder="Search for a book or author..."
        className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default SearchBar;
