import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Load products from JSON
const products = JSON.parse(fs.readFileSync("./data/products.json"));

// Routes
app.get("/", (req, res) => {
  res.send("E-Commerce Backend Running 🚀");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/checkout", (req, res) => {
  const { cart } = req.body;
  res.json({ message: "Order placed successfully!", cart });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
