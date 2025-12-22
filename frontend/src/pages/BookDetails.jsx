import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  if (!book || book.message === "Book not found") {
    return <h1 className="text-center mt-20">Book not found</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <img
        src={book.image_url}
        alt={book.title}
        className="w-64 h-80 object-cover rounded-xl shadow mb-6"
      />

      <h1 className="text-4xl font-bold text-[#2E563F]">{book.title}</h1>

      <p className="mt-2 text-lg">Author: {book.author}</p>
      <p className="text-2xl mt-4">${book.price}</p>

      <p className="mt-6">{book.description}</p>

      <button
        onClick={() => navigate(`/buy/${book.book_id}`)}
        className="mt-8 bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        Buy This Book
      </button>
    </div>
  );
}

export default BookDetails;
