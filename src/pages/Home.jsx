import { useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import books from "../data/Books";
import { Link } from "react-router-dom";

function Home() {
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = (text) => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(text.toLowerCase()) ||
        book.author.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBooks(results);
  };

  // Extract categories dynamically
  const categories = [...new Set(books.map((b) => b.category || "General"))];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* ================= HERO SECTION ================= */}
      <Hero />

      {/* ================= SEARCH BAR ================= */}
      <SearchBar onSearch={handleSearch} />

      {/* ================= BEST SELLERS ================= */}
      <h2 className="text-3xl font-bold mt-16 mb-6"> Best Sellers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredBooks.slice(0, 3).map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-900 font-bold mt-2">${book.price}</p>

            <Link
              to={`/books/${book.id}`}
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* ================= CATEGORIES ================= */}
      <h2 className="text-3xl font-bold mt-16 mb-6"> Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-blue-50 text-blue-700 font-semibold py-4 rounded-lg text-center border hover:bg-blue-100 cursor-pointer transition"
          >
            {cat}
          </div>
        ))}
      </div>

      {/* ================= ALL BOOKS SECTION ================= */}
      <h2 className="text-3xl font-bold mt-16 mb-6"> All Books</h2>

      {filteredBooks.length === 0 && (
        <p className="text-gray-600 text-lg">No books found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-md rounded-lg p-5 border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-900 font-bold mt-2">${book.price}</p>

            <Link
              to={`/books/${book.id}`}
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
