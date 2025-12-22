import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // جلب الكتب من الـ backend
  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
      <Hero />

      <div className="max-w-6xl mx-auto px-6">
        <SearchBar onSearch={handleSearch} />

        <h2 className="text-4xl font-extrabold text-[#2E563F] mt-16 mb-6">
          All Books
        </h2>

        {filteredBooks.length === 0 && (
          <p className="text-[#4A5C4F] text-lg">No books found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
          {filteredBooks.map((book) => (
            <Link key={book.book_id} to={`/books/${book.book_id}`}>
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
