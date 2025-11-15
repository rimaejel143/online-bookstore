import books from "../data/Books";

function Categories() {
  // استخراج كل الكاتيجوريز من الكتب
  const categories = [...new Set(books.map((b) => b.category || "General"))];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">📚 Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            className="bg-blue-50 text-blue-700 font-semibold p-6 rounded-xl border hover:bg-blue-100 hover:shadow-lg cursor-pointer transition text-center"
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
