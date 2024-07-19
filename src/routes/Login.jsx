import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      navigate("/alerts"); // Redirect the user to the /alerts route
    } catch (error) {
      console.error("Login error:", error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white p-8 rounded-lg w-full max-w-md border border-neutral-700">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;