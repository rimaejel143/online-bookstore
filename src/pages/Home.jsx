import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import books from "../data/Books";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Hero />
      <SearchBar />

      <h2 className="text-3xl font-bold mt-10 mb-6">Available Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-md rounded-lg p-5 border"
          >
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-900 font-bold mt-2">${book.price}</p>

            <Link
              to={`/books/${book.id}`}
              className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
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
