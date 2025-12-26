import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderItems() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [editAddress, setEditAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Read and normalize user inside effect
    const rawUser = JSON.parse(localStorage.getItem("user"));
    const user = rawUser
      ? {
          id: rawUser.id ?? rawUser.user_id ?? rawUser.userId ?? null,
          name: rawUser.name,
          email: rawUser.email,
        }
      : null;

    if (!user) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    async function fetchMyOrders() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/user/${user.id}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    }

    fetchMyOrders();
  }, [navigate]);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete order");

      alert("Order deleted successfully!");
      // Refresh orders list
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  const handleEditOpen = (order) => {
    setEditingOrder(order);
    setEditQuantity(order.quantity);
    setEditAddress(order.address);
  };

  const handleEditSave = async () => {
    if (!editingOrder) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${editingOrder.order_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantity: Number(editQuantity),
            address: editAddress,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update order");

      alert("Order updated successfully!");
      setEditingOrder(null);
      // Refresh orders list
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  const handleEditCancel = () => {
    setEditingOrder(null);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 mt-24">
      <h1 className="text-3xl font-bold text-[#2f5b49] mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#2f5b49] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Book</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((item) => (
                <tr
                  key={item.order_item_id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{item.order_id}</td>
                  <td className="px-4 py-3">{item.book_title}</td>
                  <td className="px-4 py-3 text-center">{item.quantity}</td>
                  <td className="px-4 py-3">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEditOpen(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.order_id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-[#2f5b49]">
              Edit Order #{editingOrder.order_id}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Book: {editingOrder.book_title}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <textarea
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleEditSave}
                  className="flex-1 bg-green-700 text-white py-2 rounded hover:bg-green-800"
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
