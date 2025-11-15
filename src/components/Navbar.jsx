import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#F7F2EB] shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-[#2E563F] tracking-wide">
          Online Bookstore
        </h1>

        {/* Links */}
        <ul className="flex gap-10 text-[#2E563F] font-semibold">
          <li>
            <Link to="/" className="hover:text-[#244C36] transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/services" className="hover:text-[#244C36] transition">
              Services
            </Link>
          </li>

          <li>
            <Link to="/bestsellers" className="hover:text-[#244C36] transition">
              Best Sellers
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-[#244C36] transition">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-[#244C36] transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
