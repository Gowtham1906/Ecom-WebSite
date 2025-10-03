// frontend/src/components/Cart.js
import React from "react";

function Cart({ cart, addToCart, removeFromCart, clearCart }) {
  // Calculate total dynamically
  const total = cart.reduce(
    (sum, item) => sum + (item.Price || 0) * item.quantity,
    0
  );

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.Id} style={{ marginBottom: "5px" }}>
                <span>
                  {item.Name} - ₹{Number(item.Price).toLocaleString()} × {item.quantity} = ₹
                  {(item.Price * item.quantity).toLocaleString()}
                </span>
                <button
                  style={{
                    marginLeft: "10px",
                    padding: "2px 6px",
                    cursor: "pointer",
                    border: "1px solid #333",
                    backgroundColor: "#f0f0f0",
                  }}
                  onClick={() => addToCart(item)}
                >
                  ➕
                </button>
                <button
                  style={{
                    marginLeft: "5px",
                    padding: "2px 6px",
                    cursor: "pointer",
                    border: "1px solid #333",
                    backgroundColor: "#f0f0f0",
                  }}
                  onClick={() => removeFromCart(item)}
                >
                  ➖
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toLocaleString()}</h3>
          <button
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={clearCart}
          >
            🗑 Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
