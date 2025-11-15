import books from "../data/Books";
import BookCard from "./BookCard";

function BookGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
      {books.map((b, index) => (
        <BookCard
          key={index}
          title={b.title}
          author={b.author}
          image={b.image}
        />
      ))}
    </div>
  );
}

export default BookGrid;
