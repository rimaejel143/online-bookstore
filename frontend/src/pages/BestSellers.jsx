import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

function BestSellers() {
  const [bestBooks, setBestBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        // فلترة الكتب bestseller من الـ DB
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

        {bestBooks.length === 0 && (
          <p className="text-[#4A5C4F] text-lg">No best seller books found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {bestBooks.map((book) => (
            <Link key={book.book_id} to={`/books/${book.book_id}`}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
