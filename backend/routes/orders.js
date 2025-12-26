const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* =========================
   CREATE ORDER
========================= */
router.post("/", async (req, res) => {
  const { userId, address, items } = req.body;

  // log incoming payload for easier debugging
  console.log("Create order payload:", req.body);

  if (typeof userId === "undefined") {
    return res.status(400).json({ message: "Missing field: userId" });
  }

  if (!address || typeof address !== "string") {
    return res
      .status(400)
      .json({ message: "Missing or invalid field: address" });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Missing or invalid field: items" });
  }

  // validate items shape
  for (const it of items) {
    if (
      typeof it.book_id === "undefined" ||
      typeof it.quantity === "undefined"
    ) {
      return res
        .status(400)
        .json({ message: "Each item must include book_id and quantity" });
    }
    if (Number(it.quantity) <= 0) {
      return res
        .status(400)
        .json({ message: "Each item must have quantity > 0" });
    }
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    let totalPrice = 0;

    for (const item of items) {
      const [rows] = await connection.query(
        "SELECT price FROM books WHERE book_id = ?",
        [item.book_id]
      );

      if (rows.length === 0) {
        throw new Error("Book not found");
      }

      totalPrice += rows[0].price * item.quantity;
    }

    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total_price, address) VALUES (?, ?, ?)",
      [userId, totalPrice, address]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        "INSERT INTO order_items (order_id, book_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.book_id, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "Failed to create order" });
  } finally {
    connection.release();
  }
});

/* =========================
   GET ORDERS FOR USER
========================= */
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT 
        o.order_id,
        b.title AS book_title,
        oi.quantity,
        o.total_price,
        o.address,
        o.created_at
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN books b ON oi.book_id = b.book_id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* =========================
   DELETE ORDER
========================= */
router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Delete order items first (foreign key constraint)
    await connection.query("DELETE FROM order_items WHERE order_id = ?", [
      orderId,
    ]);

    // Delete the order
    await connection.query("DELETE FROM orders WHERE order_id = ?", [orderId]);

    await connection.commit();

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  } finally {
    connection.release();
  }
});

/* =========================
   UPDATE ORDER
========================= */
router.put("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { quantity, address } = req.body;

  console.log("Update order request:", { orderId, quantity, address });

  if (!orderId) {
    return res.status(400).json({ message: "Order ID is required" });
  }

  if (!quantity && !address) {
    return res
      .status(400)
      .json({ message: "Provide quantity or address to update" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Update quantity if provided and is a valid number
    if (quantity && Number(quantity) > 0) {
      await connection.query(
        "UPDATE order_items SET quantity = ? WHERE order_id = ?",
        [Number(quantity), orderId]
      );
    }

    // Update address if provided and is not empty
    if (address && address.trim()) {
      await connection.query(
        "UPDATE orders SET address = ? WHERE order_id = ?",
        [address.trim(), orderId]
      );
    }

    await connection.commit();
    console.log("Order updated successfully:", orderId);

    res.json({ message: "Order updated successfully" });
  } catch (err) {
    await connection.rollback();
    console.error("Update order error:", err);
    res
      .status(500)
      .json({ message: "Failed to update order", error: err.message });
  } finally {
    connection.release();
  }
});

module.exports = router;
