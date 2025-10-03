import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/products") // works on Azure backend
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Add product with quantity support
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

  // Remove product or decrease quantity
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

  // Clear all items from cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛍 Simple E-Commerce Store</h1>
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
