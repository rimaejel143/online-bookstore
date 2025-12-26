const express = require("express");
const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // مؤقت للتجربة
  if (email && password) {
    return res.json({ success: true, user: { email } });
  }

  res.status(400).json({ success: false });
});

// SIGNUP
router.post("/signup", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
module.exports = router;
