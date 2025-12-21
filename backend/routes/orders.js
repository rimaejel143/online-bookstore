const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ================= CREATE ORDER ================= */
router.post("/", async (req, res) => {
  const { userId, totalPrice, address } = req.body;

  if (!userId || !totalPrice || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db.query(
      `INSERT INTO orders (user_id, total_price, address)
       VALUES (?, ?, ?)`,
      [userId, totalPrice, address]
    );

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET ALL ORDERS ================= */
router.get("/", async (req, res) => {
  try {
    const [orders] = await db.query("SELECT * FROM orders");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
