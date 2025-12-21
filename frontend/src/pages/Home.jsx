import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-20">
          {filteredBooks.map((book) => (
            <div key={book.book_id} className="bg-[#F5F0E9] p-6 rounded-xl">
              <h3 className="text-2xl font-bold">{book.title}</h3>
              <p className="mt-1">Author: {book.author}</p>
              <p className="mt-2 font-bold">${book.price}</p>

              <Link
                to={`/books/${book.book_id}`}
                className="inline-block mt-4 bg-green-700 text-white px-4 py-2 rounded"
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
