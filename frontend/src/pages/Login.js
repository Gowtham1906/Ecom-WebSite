// frontend/src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

function Login({ setToken }) {
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const url = authMode === "login" ? "/api/login" : "/api/signup";
      const res = await axios.post(`${API_BASE}${url}`, { username, password });

      if (authMode === "login") {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setMessage(`Welcome ${username}!`);
        navigate("/"); // go to products page
      } else {
        setMessage("Signup successful! You can now login.");
        setAuthMode("login");
      }

      setUsername("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Authentication error");
    }
  };

  return (
    <div>
      <h2>{authMode === "login" ? "Login" : "Signup"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{authMode === "login" ? "Login" : "Signup"}</button>
      </form>
      <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
        {authMode === "login" ? "Create Account" : "Have an account? Login"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
