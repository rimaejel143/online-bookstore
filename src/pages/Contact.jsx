import React from 'react'

function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-blue-700">Contact us</h1>
        <form className="mt-10 grid gap-6">
            <input type="email" placeholder="Email" className="border p-3 rounded-lg shadow-sm focus:outline-blue-600"/>

            <textarea placeholder="Message" rows="6" className="border p-3 rounded-lg shadow-sm focus:outline-blue-600"></textarea>
            
            <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Send Message

            </button>
        </form>

    </div>
  );
}

export default Contact
