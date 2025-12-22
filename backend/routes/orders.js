const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { userId, address, items } = req.body;
  /*
    items = [
      { book_id: 2, quantity: 1 }
    ]
  */

  if (!userId || !address || !items || items.length === 0) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1️⃣ حساب total price من جدول books
    let totalPrice = 0;

    for (const item of items) {
      const [rows] = await connection.query(
        "SELECT price FROM books WHERE book_id = ?",
        [item.book_id]
      );

      totalPrice += rows[0].price * item.quantity;
    }

    // 2️⃣ insert order
    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total_price, address) VALUES (?, ?, ?)",
      [userId, totalPrice, address]
    );

    const orderId = orderResult.insertId;

    // 3️⃣ insert order_items
    for (const item of items) {
      await connection.query(
        "INSERT INTO order_items (order_id, book_id, quantity) VALUES (?, ?, ?)",
        [orderId, item.book_id, item.quantity]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order created successfully",
      orderId,
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  } finally {
    connection.release();
  }
});

module.exports = router;
