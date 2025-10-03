// frontend/src/pages/CartPage.js
import React from "react";
import Cart from "../components/Cart";

function CartPage({ cart, addToCart, removeFromCart, clearCart }) {
  return (
    <Cart
      cart={cart}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      clearCart={clearCart}
    />
  );
}

export default CartPage;
