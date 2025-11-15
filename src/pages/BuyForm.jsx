import { useParams, useNavigate } from "react-router-dom";
import books from "../data/Books";
import { useState } from "react";

function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ❗ كل الـ useState لازم يكون بأول الكومبوننت
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const book = books.find((b) => b.id === parseInt(id));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully for ${book.title}!`);
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Buy: {book?.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Your Name</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            className="w-full border p-3 rounded-lg"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold">Address</label>
          <textarea
            className="w-full border p-3 rounded-lg"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default BuyForm;
