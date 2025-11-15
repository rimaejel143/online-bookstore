function Hero() {
  return (
    <section className="bg-[#F7F2EB] py-28">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#2E563F] leading-tight drop-shadow-sm">
          Discover Your Next <br className="hidden sm:block" /> Favorite Book
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#4A5C4F] mt-5 max-w-2xl mx-auto opacity-90">
          Explore a curated collection of books designed to inspire, educate,
          and entertain.
        </p>

        {/* Button */}
        <button
          className="
          mt-10 
          bg-[#2E563F] 
          hover:bg-[#244C36] 
          text-white 
          font-semibold 
          px-10 
          py-3 
          rounded-2xl 
          shadow-lg 
          transition 
          transform 
          hover:scale-105
        "
        >
          Browse Collection
        </button>
      </div>
    </section>
  );
}

export default Hero;
