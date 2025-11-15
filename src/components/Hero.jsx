function Hero() {
  return (
    <section className="bg-[#F5F0E9] py-32">
      <div className="max-w-6xl mx-auto text-center px-6 mt-10">
        <h1 className="text-6xl font-extrabold text-[#2E563F] leading-tight">
          Your Online Bookstore
        </h1>
        <p className="text-lg text-[#4A5C4F] mt-6 max-w-2xl mx-auto">
          Browse through our hand-picked collection of best-selling and
          inspiring books.
        </p>
        <button className="mt-10 bg-[#2E563F] hover:bg-[#244C36] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition transform hover:scale-105">
          Start Reading
        </button>
      </div>
    </section>
  );
}

export default Hero;
