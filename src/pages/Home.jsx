import React from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import BookGrid from "../components/BookGrid";

function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <BookGrid />
    </>
  );
}

export default Home;
