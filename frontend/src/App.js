import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookDetails from "./pages/BookDetails";
import BestSellers from "./pages/BestSellers";
import BuyForm from "./pages/BuyForm";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/bestsellers" element={<BestSellers />} />
          <Route path="/buy/:id" element={<BuyForm />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
