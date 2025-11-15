import { useParams } from "react-router-dom";
import books from "../data/Books";

function BookDetails() {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book)
    return <h1 className="text-center text-2xl mt-20">Book not found</h1>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold">{book.title}</h1>
      <p className="text-gray-600 mt-2">Author: {book.author}</p>
      <p className="text-2xl font-semibold mt-4">${book.price}</p>

      <p className="mt-6 text-gray-800 leading-relaxed">{book.description}</p>
    </div>
  );
}

export default BookDetails;
