import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <h1 className="mt-20 text-center">Book not found</h1>;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold">{book.title}</h1>
      <p className="mt-2">Author: {book.author}</p>
      <p className="text-2xl mt-4">${book.price}</p>
      <p className="mt-6">{book.description}</p>

      <button
        onClick={() => navigate(`/buy/${book.book_id}`)}
        className="mt-6 bg-green-700 text-white px-6 py-3 rounded"
      >
        Buy This Book
      </button>
    </div>
  );
}

export default BookDetails;
