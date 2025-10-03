// frontend/src/components/ProductList.js
import React from "react";

function ProductList({ products, addToCart }) {
  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.Id} style={{ marginBottom: "10px" }}>
            {product.Name} - ₹{Number(product.Price).toLocaleString()}
            <button
              style={{ marginLeft: "10px" }}
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
