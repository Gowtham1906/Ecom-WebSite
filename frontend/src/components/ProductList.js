// frontend/src/components/ProductList.js
import React from "react";

function ProductList({ products, addToCart }) {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Products</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {products.map((product) => (
          <li key={product.Id} style={{ marginBottom: "10px" }}>
            <span>
              {product.Name} - ₹{Number(product.Price).toLocaleString()}
            </span>
            <button
              style={{
                marginLeft: "10px",
                padding: "3px 8px",
                cursor: "pointer",
                border: "1px solid #333",
                backgroundColor: "#f0f0f0",
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
