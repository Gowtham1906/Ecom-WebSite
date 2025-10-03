// frontend/src/pages/Products.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <ProductList products={products} addToCart={addToCart} />;
}

export default Products;
