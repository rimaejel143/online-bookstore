import React from "react";

function SearchBar({ onSearch }) {
  return (
    <div className="flex justify-center mt-10">
      <input
        type="text"
        placeholder="Search for books..."
        className="w-1/2 p-3 border rounded-l-lg shadow-sm"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="px-4 bg-blue-600 text-white rounded-r-lg">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
