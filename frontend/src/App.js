// frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function App() {
  // --- State ---
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // --- Fetch products ---
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // --- Persist cart ---
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // --- Add to cart ---
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

  // --- Remove from cart ---
  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.Id === product.Id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // --- Clear cart ---
  const clearCart = () => {
    setCart([]);
  };

  // --- Login / Signup handlers ---
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const url = authMode === "login" ? "/api/login" : "/api/signup";
      const res = await axios.post(`${API_BASE}${url}`, { username, password });

      if (authMode === "login") {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setMessage(`Welcome ${username}!`);
      } else {
        setMessage("Signup successful! You can now login.");
        setAuthMode("login");
      }

      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Authentication error");
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessage("Logged out successfully.");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍 Simple E-Commerce Store</h1>

      {/* --- Authentication Forms --- */}
      {!token ? (
        <div style={{ marginBottom: "20px" }}>
          <h2>{authMode === "login" ? "Login" : "Signup"}</h2>
          <form onSubmit={handleAuth}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{authMode === "login" ? "Login" : "Signup"}</button>
          </form>
          <button
            onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
          >
            {authMode === "login" ? "Create Account" : "Have an account? Login"}
          </button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <p>{message}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* --- Product List --- */}
      <ProductList products={products} addToCart={addToCart} />

      {/* --- Cart --- */}
      <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />
    </div>
  );
}

export default App;
