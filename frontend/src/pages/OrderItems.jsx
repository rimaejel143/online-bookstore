import { useEffect, useState } from "react";

export default function OrderItems() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrderItems() {
      try {
        const res = await fetch("http://localhost:5000/api/orders/order-items");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load order items");
      } finally {
        setLoading(false);
      }
    }

    fetchOrderItems();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#2f5b49] mb-6">Order Items</h1>

      {orders.length === 0 ? (
        <p>No order items found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#2f5b49] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Book</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{item.order_id}</td>
                  <td className="px-4 py-3">{item.user_name}</td>
                  <td className="px-4 py-3">{item.email}</td>
                  <td className="px-4 py-3">{item.book_title}</td>
                  <td className="px-4 py-3 text-center">{item.quantity}</td>
                  <td className="px-4 py-3">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
