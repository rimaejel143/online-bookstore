import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      bookId: book.id,
      customerName: name,
      email,
      address,
    };

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">Loading order form...</h1>
    );
  }

  if (!book) {
    return <h1 className="text-center text-2xl mt-20">Book not found</h1>;
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Buy: {book.title}</h1>

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
