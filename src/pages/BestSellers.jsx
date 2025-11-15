import books from "../data/Books";
import { Link } from "react-router-dom";

function BestSellers() {
  // نجرب نعتبر أول 3 كتب "Best Sellers"
  const best = books.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">🔥 Best Sellers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {best.map((book) => (
          <div className="bg-white shadow-lg p-6 rounded-xl border hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-blue-700 font-bold mt-3">${book.price}</p>

            <Link
              to={`/books/${book.id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
