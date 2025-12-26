import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch(() => alert("Failed to load book"));
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id, // ✅
        address: address, // ✅
        items: [
          {
            book_id: book.book_id,
            quantity: quantity, // ✅
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order placed successfully!");
      navigate("/orders");
    } else {
      alert(data.message);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Buy: {book.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={user.name}
          disabled
          className="w-full border p-3 rounded bg-gray-100"
        />

        <input
          value={user.email}
          disabled
          className="w-full border p-3 rounded bg-gray-100"
        />

        <textarea
          placeholder="Address"
          className="w-full border p-3 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          className="w-full border p-3 rounded"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button className="w-full bg-green-700 text-white py-3 rounded">
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default BuyForm;
