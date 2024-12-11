// src/components/Registration.js

import React, { useState } from "react";
import axios from "axios";
import "./css/Registration.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration successful! Please log in.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="registration-container">
      {" "}
      {/* Apply the container class */}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}{" "}
        {/* Apply the error class */}
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
