import React from "react";

function Hero() {
  return (
    <section className="bg-blue-700 text-white py-20 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Find Your Next Favorite Book
        </h1>
        <p className="text-lg mb-6">
          Explore thousands of books across all genres.
        </p>
        <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow">
          Browse Books
        </button>
      </div>
    </section>
  );
}

export default Hero;
