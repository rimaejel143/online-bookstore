import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      userId: 1, // مؤقت
      address,
      items: [
        {
          book_id: book.book_id,
          quantity: 1,
        },
      ],
    };

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      alert("Order placed successfully!");
      navigate("/");
    } else {
      alert("Error creating order");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto py-20">
      <h1 className="text-3xl font-bold mb-6">Buy: {book.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          required
          placeholder="Your address"
          className="w-full border p-3 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button className="w-full bg-green-700 text-white py-3 rounded">
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default BuyForm;
