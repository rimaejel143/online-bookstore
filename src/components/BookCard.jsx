import React from "react";

function BookCard({ title, author, image }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded-md"
      />
      <h3 className="text-xl font-bold mt-3">{title}</h3>
      <p className="text-gray-600">{author}</p>
    </div>
  );
}

export default BookCard;
