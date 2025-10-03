// frontend/src/components/Cart.js
import React from "react";

function Cart({ cart }) {
  // Calculate total price
  const total = cart.reduce((sum, item) => sum + (item.Price || 0), 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>
              {item.Name} - ₹{item.Price}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
