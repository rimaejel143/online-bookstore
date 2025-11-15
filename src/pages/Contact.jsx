import React from "react";

function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-700 text-lg">
        We're here to help! You can contact us anytime via:
      </p>

      <div className="mt-6 space-y-4 text-gray-700 text-lg">
        <p>📧 Email: support@onlinebookstore.com</p>
        <p>📞 Phone: +961 70 000 000</p>
        <p>📍 Location: Beirut, Lebanon</p>
      </div>
    </div>
  );
}

export default Contact;