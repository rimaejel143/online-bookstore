function Hero() {
  return (
    <section className="w-full py-24 flex justify-center">
      <div
        className="w-[85%] md:w-[70%] h-[450px] bg-cover bg-center rounded-2xl shadow-xl flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/35 rounded-2xl"></div>

        <div className="relative z-10 text-center px-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#2E563F] drop-shadow-lg">
            Your Online Bookstore
          </h1>

          <p className="text-lg md:text-xl mt-4 text-[#4A5C4F] font-medium">
            Browse through our hand-picked collection of best-selling and
            inspiring books.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
