const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const requiredEnvironmentVariables = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "JWT_SECRET"];
const missingEnvironmentVariables = requiredEnvironmentVariables.filter((name) => !process.env[name]);

if (missingEnvironmentVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`);
}

const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        error: " Error fetching products from database",
      });
      return;
    }
    res.json(result);
  });
});

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [productId], (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Database error while fetching product details",
      });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }
    res.json(result[0]);
  });
});

app.post("/products", (req, res) => {
  const { name, price, description, image } = req.body;
  const query = `INSERT INTO products (name, price, description, image) VALUES (?,?,?,?)`;

  db.query(query, [name, price, description, image], (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Failed to add product ",
      });
      return;
    }
    res.json({
      message: "Product added successfully",
    });
  });
});

app.delete("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [productId], (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Failed to delete product",
      });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
});

app.put("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const { name, price, description, image } = req.body;
  const query = "UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?";

  db.query(query, [name, price, description, image, productId], (err, result) => {
    if (err) {
      res.status(500).json({
        error: "Failed to update product",
      });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }
    res.json({
      message: "Product updated successfully",
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
