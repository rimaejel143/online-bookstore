import React from "react";

function About() {
  return (
    <div className="bg-[#F7F2EB] min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-[#2E563F] mb-8">
          About Us
        </h1>

        <p className="text-[#4A5C4F] leading-relaxed text-lg">
          Welcome to our online bookstore! We created this platform to make
          books more accessible to readers everywhere. Our mission is to provide
          a seamless, fast, and enjoyable reading experience.
        </p>

        <p className="text-[#4A5C4F] mt-6 leading-relaxed text-lg">
          We believe in the power of books to inspire, educate, and transform.
          Here, you can explore new titles, discover top recommendations, and
          read detailed descriptions before choosing your next favorite book.
        </p>
      </div>
    </div>
  );
}

export default About;
