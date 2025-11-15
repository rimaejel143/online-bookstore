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

  return (
    <div className="bg-[#F7F2EB] min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <Hero />

      {/* ================= SEARCH + CONTENT WRAPPER ================= */}
      <div className="max-w-6xl mx-auto px-6">
        {/* ================= SEARCH BAR ================= */}
        <SearchBar onSearch={handleSearch} />

        {/* ================= ALL BOOKS TITLE ================= */}
        <h2 className="text-4xl font-extrabold text-[#2E563F] mt-16 mb-6">
          All Books
        </h2>

        {/* Empty search result */}
        {filteredBooks.length === 0 && (
          <p className="text-[#4A5C4F] text-lg">No books found.</p>
        )}

        {/* ================= BOOKS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[#F5F0E9] shadow-md rounded-xl p-6 border border-[#D6CEC2] 
              hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <h3 className="text-2xl font-bold text-[#2E563F]">
                {book.title}
              </h3>

              <p className="text-[#4A5C4F] mt-1">Author: {book.author}</p>

              <p className="text-[#2E563F] font-bold text-lg mt-3">
                ${book.price}
              </p>

              <Link
                to={`/books/${book.id}`}
                className="inline-block mt-5 bg-[#2E563F] hover:bg-[#244C36] 
                text-white px-5 py-2 rounded-xl transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
