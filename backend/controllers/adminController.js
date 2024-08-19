const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret";

const router = express.Router();

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && admin.comparePassword(password)) {
      const token = jwt.sign(
        {
          email: admin.email,
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
        },
        jwtSecret,
        { expiresIn: "1h" }
      );

      res.cookie("token", token).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in admin" });
  }
});

const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.admin = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

router.get("/dashboard", checkAdmin, (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
});

module.exports = router;
