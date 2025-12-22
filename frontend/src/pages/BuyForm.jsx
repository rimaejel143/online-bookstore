import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // جلب الكتاب من الـ API
  useEffect(() => {
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch(() => alert("Failed to load book"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          address: address,
          items: [
            {
              book_id: book.book_id,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (!book) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Buy: {book.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Your Name</label>
          <input
            className="w-full border p-3 rounded"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full border p-3 rounded"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            className="w-full border p-3 rounded"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button className="w-full bg-green-700 text-white py-3 rounded">
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default BuyForm;
