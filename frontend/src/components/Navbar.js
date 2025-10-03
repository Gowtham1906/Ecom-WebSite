// frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ token, handleLogout }) {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      {token ? (
        <>
          <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
