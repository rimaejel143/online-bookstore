import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BestSellers() {
  const [bestBooks, setBestBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        const best = data.filter((book) => book.is_best_seller === 1);
        setBestBooks(best);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#F7F2EB] min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#2E563F] mb-10">
          🔥 Best Sellers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {bestBooks.map((book) => (
            <div
              key={book.book_id}
              className="bg-[#F5F0E9] border border-[#D6CEC2] shadow-md p-6 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-[#2E563F]">
                {book.title}
              </h2>

              <p className="text-[#4A5C4F] mt-1">Author: {book.author}</p>

              <p className="text-[#2E563F] font-bold text-lg mt-3">
                ${book.price}
              </p>

              <Link
                to={`/books/${book.book_id}`}
                className="inline-block mt-5 bg-[#2E563F] text-white px-5 py-2 rounded-xl"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
