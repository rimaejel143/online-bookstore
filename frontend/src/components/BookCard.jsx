import React from "react";

function BookCard({ book }) {
  return (
    <div className="bg-[#F9F5EF] rounded-xl p-4 shadow border border-[#E0D8CB] hover:shadow-xl transition-all duration-300">
      <img
        src={book.image_url}
        alt={book.title}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h3 className="text-xl font-bold text-[#2E563F] mt-3">{book.title}</h3>

      <p className="text-[#5F6A61]">{book.author}</p>

      <p className="text-[#2E563F] font-bold mt-2">${book.price}</p>
    </div>
  );
}

export default BookCard;
