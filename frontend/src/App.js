import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on app start
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    axios
      .get("/api/products") // Azure backend endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.Id === product.Id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const existingItem = cart.find((item) => item.Id === product.Id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.Id !== product.Id));
    } else {
      setCart(
        cart.map((item) =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍 Welcome to E-Commerce Store</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}

export default App;
