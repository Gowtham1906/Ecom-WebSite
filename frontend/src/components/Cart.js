import React from "react";

function Cart({ cart, addToCart, removeFromCart, clearCart }) {
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
          <ul>
            {cart.map((item) => (
              <li key={item.Id} style={{ marginBottom: "5px" }}>
                {item.Name} - ₹{item.Price} × {item.quantity} = ₹
                {item.Price * item.quantity}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => addToCart(item)}
                >
                  ➕
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => removeFromCart(item)}
                >
                  ➖
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
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
