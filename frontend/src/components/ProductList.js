// frontend/src/components/ProductList.js
import React from "react";

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>No products available</p>}
      <ul>
        {products.map((p) => (
          <li key={p.Id}>
            {p.Name} - ₹{p.Price}
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
