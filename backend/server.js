require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const orderRoutes = require("./routes/orders");
const booksRoutes = require("./routes/books");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/orders", orderRoutes);
app.use("/api/books", booksRoutes);

// test
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running successfully" });
});

// signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // normalize id field: DB may use `id` or `user_id`
    const rawUser = users[0];
    const userId = rawUser.id ?? rawUser.user_id ?? rawUser.userId;

    const resultUser = {
      id: userId,
      name: rawUser.name,
      email: rawUser.email,
    };

    console.log("Login result user:", resultUser);

    res.json({
      message: "Login successful",
      user: resultUser,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
