import { useParams, useNavigate } from "react-router-dom";
import books from "../data/Books";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === parseInt(id));

  if (!book)
    return <h1 className="text-center text-2xl mt-20">Book not found</h1>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="w-64 h-80 object-cover rounded-xl shadow-md"
          />
        )}

        <div>
          <h1 className="text-4xl font-bold text-[#2E563F]">{book.title}</h1>

          <p className="text-gray-600 mt-2 text-lg">
            Author: <span className="font-medium">{book.author}</span>
          </p>

          <p className="text-2xl font-semibold mt-4 text-green-700">
            ${book.price}
          </p>

          <p className="mt-6 text-gray-800 text-lg leading-relaxed max-w-xl">
            {book.description}
          </p>

          <button
            onClick={() => navigate(`/buy/${book.id}`)}
            className="mt-8 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow-md font-semibold"
          >
            Buy This Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
