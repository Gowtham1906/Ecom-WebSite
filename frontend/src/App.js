// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./pages/Login";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Fetch products
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.Id === product.Id);
      if (existing) {
        return prevCart.map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>🛍 Welcome To E-Commerce Store</h1>
        <Navbar token={token} handleLogout={handleLogout} />

        <Routes>
          {/* Login Page */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
          />

          {/* Products Page */}
          <Route
            path="/"
            element={
              token ? (
                <ProductList products={products} addToCart={addToCart} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              token ? (
                <Cart
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
