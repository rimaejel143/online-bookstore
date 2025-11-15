import React from "react";

function BookCard({ title, author, image }) {
  return (
    <div className="bg-[#F9F5EF] rounded-xl p-4 shadow-[0_3px_10px_rgba(0,0,0,0.15)] border border-[#E0D8CB] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h3 className="text-xl font-bold text-[#2E563F] mt-3">{title}</h3>

      <p className="text-[#5F6A61]">{author}</p>
    </div>
  );
}

export default BookCard;
