import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BuyForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Read and normalize user inside effect
    const rawUser = JSON.parse(localStorage.getItem("user"));
    const storedUser = rawUser
      ? {
          id: rawUser.id ?? rawUser.user_id ?? rawUser.userId ?? null,
          name: rawUser.name,
          email: rawUser.email,
        }
      : null;

    console.log("storedUser in effect", storedUser);

    // Don't redirect on mount — require login only at submit.
    fetch(`http://localhost:5000/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch(() => alert("Failed to load book"));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Read user fresh on submit
    const rawUser = JSON.parse(localStorage.getItem("user"));
    const storedUser = rawUser
      ? {
          id: rawUser.id ?? rawUser.user_id ?? rawUser.userId ?? null,
          name: rawUser.name,
          email: rawUser.email,
        }
      : null;

    console.log("storedUser on submit:", storedUser);
    console.log("storedUser.id:", storedUser?.id);

    if (!storedUser || !storedUser.id) {
      alert("Please log in first");
      navigate("/auth");
      return;
    }
    if (!book) {
      alert("Book not loaded yet");
      return;
    }

    const payload = {
      userId: storedUser.id,
      address,
      items: [
        {
          book_id: book.book_id,
          quantity: Number(quantity),
        },
      ],
    };

    console.log("payload", payload);
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  if (!book) return null;

  // Read user for display fields
  const rawUser = JSON.parse(localStorage.getItem("user"));
  const displayUser = rawUser
    ? {
        id: rawUser.id ?? rawUser.user_id ?? rawUser.userId ?? null,
        name: rawUser.name,
        email: rawUser.email,
      }
    : null;

  return (
    <div className="max-w-xl mx-auto py-16">
      <h1 className="text-2xl font-bold mb-4">Buy: {book.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={displayUser?.name || ""}
          disabled
          className="w-full p-3 border rounded"
        />
        <input
          value={displayUser?.email || ""}
          disabled
          className="w-full p-3 border rounded"
        />

        <textarea
          placeholder="Address"
          required
          className="w-full p-3 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-3 border rounded"
        />

        <button className="w-full bg-green-700 text-white py-3 rounded">
          Confirm Order
        </button>
      </form>
    </div>
  );
}
