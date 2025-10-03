import React from "react";

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.Id} style={{ marginBottom: "10px" }}>
            {p.Name} - ₹{p.Price}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => addToCart(p)}
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
