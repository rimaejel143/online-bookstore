import { useParams } from "react-router-dom";
import books from "../data/books";

import React from 'react'

function BookDetails() {
    const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  if (!book) return <h1 className="text-center mt-20">Book Not Found</h1>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
        <img src={book.image} 
        alt={book.title} 
        className="w-80 h-96 object-cover rounded-xl shadow-md"/>

        <h1 className="text-4xl font-bold mt-6 text-blue-700">{book.title}</h1>
        <p className="text-xl text-gray-600">{book.author}</p>

        <p className="mt-6 text-gray-700 leading-7">{book.description}</p>

        <p className="text-3xl text-blue-600 font-bold mt-6">${book.price}</p>
    
    </div>
  );
}

export default BookDetails
