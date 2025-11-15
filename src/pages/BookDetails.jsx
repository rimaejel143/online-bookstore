import { useParams } from "react-router-dom";
import books from "../data/Books";

function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book)
    return (
      <h1 className="text-center text-2xl text-[#2E563F] mt-20">
        Book not found
      </h1>
    );

  return (
    <div className="bg-[#F7F2EB] min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto bg-[#F5F0E9] p-10 rounded-2xl shadow-md border border-[#D6CEC2]">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-[#2E563F]">{book.title}</h1>

        {/* Author */}
        <p className="mt-3 text-lg text-[#4A5C4F]">
          Author: <span className="font-semibold">{book.author}</span>
        </p>

        {/* Price */}
        <p className="mt-4 text-3xl font-bold text-[#2E563F]">${book.price}</p>

        {/* Book Image */}
        {book.image && (
          <img
            src={book.image}
            alt={book.title}
            className="mt-6 w-64 rounded-xl shadow-lg mx-auto"
          />
        )}

        {/* Description */}
        <p className="mt-8 text-[#4A5C4F] leading-relaxed text-lg">
          {book.description}
        </p>

        {/* Button */}
        <button
          className="mt-10 bg-[#2E563F] hover:bg-[#244C36] 
          text-white px-8 py-3 rounded-xl 
          font-semibold shadow-md transition 
          block mx-auto"
        >
          Add to Reading List
        </button>
      </div>
    </div>
  );
}

export default BookDetails;
