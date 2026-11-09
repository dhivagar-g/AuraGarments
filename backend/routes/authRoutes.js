const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("register api called ");
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password encrypted");
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, result) => {
      console.log("database response");
      if (err) {
        res.status(500).json({
          error: err.message,
        });
        return;
      }
      res.json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({
        error: "user not found",
      });
      return;
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({
        error: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      message: "Login successful",
      token,
    });
  });
});

router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const query = "SELECT id,name,email FROM users WHERE id = ?";
      db.query(query, [userId], (err, result) => {
        console.log("database response");
        if (err) {
          res.status(500).json({
            error: err.message,
          });
          return;
        }
        if (result.length === 0) {
          res.status(404).json({
            error: "User not found",
          });
          return;
        }
        res.json({
          message: "User data retrieved successfully",
          user: result[0],
        });
      });
      return;
    } catch (error) {
      res.status(401).json({
        error: "Unauthorized",
      });
    }
  } else {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
});

router.put("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  const { name, email } = req.body;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
      const query = "UPDATE users SET name = ?,email=? WHERE id= ?";
      db.query(query, [name, email, userId], (err, result) => {
        console.log("database response");
        if (err) {
          res.status(500).json({
            error: err.message,
          });
          return;
        }
        res.json({
          message: "user data updated successfully",
        });
      });
    } catch (error) {
      res.status(401).json({
        error: "unauthorized",
      });
    }
  } else {
    res.status(401).json({
      error: "unauthorized",
    });
  }
});

module.exports = router;
