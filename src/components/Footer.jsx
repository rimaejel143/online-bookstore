import React from "react";

function Footer() {
  return (
    <footer className="bg-[#2E563F] text-[#F5F0E9] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Online Bookstore</h3>
            <p className="text-[#E5DED3]">
              Your trusted platform for books, knowledge, and learning.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/services" className="text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Instagram</li>
              <li className="hover:text-white cursor-pointer">Facebook</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-[#E5DED3] mt-12 text-sm">
          © {new Date().getFullYear()} Online Bookstore — All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
