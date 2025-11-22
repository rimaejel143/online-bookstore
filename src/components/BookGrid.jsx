import books from "../data/Books";
import BookCard from "./BookCard";

function BookGrid() {
  return (
    <section className="bg-[#F5F0E9] py-20 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {books.map((b, index) => (
          <BookCard
            key={index}
            title={b.title}
            author={b.author}
            image={b.image}
            id={b.id}
          />
        ))}
      </div>
    </section>
  );
}

export default BookGrid;
