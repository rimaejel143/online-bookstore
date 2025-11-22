import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  const handleInput = (e) => {
    setText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mt-0 mb-0 flex justify-center">
      <input
        type="text"
        value={text}
        onChange={handleInput}
        placeholder="Search for a book or author..."
        className="
          w-full max-w-lg 
          px-4 py-3 
          border border-[#D6CEC2]
          bg-[#F7F2EB]
          rounded-xl shadow-sm 
          text-[#2E563F]
          placeholder-[#8E8A83]
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#2E563F]
          transition
        "
      />
    </div>
  );
}

export default SearchBar;
