import React from "react";

function ProductList({ products, addToCart }) {
  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <b>{p.name}</b> - ₹{p.price}
          <button style={{ marginLeft: "10px" }} onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
