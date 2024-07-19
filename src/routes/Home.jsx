import img from "../../public/Workshop2.jpg";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home({ loggedIn, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log(loggedIn)
  const handleLogin = async () => {
    localStorage.removeItem("authToken");
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        // alert("Logged in successfully!");
        // navigate("/alerts");
        window.location.reload()
      } else {
        // Handle unexpected responses
        console.error("Unexpected response:", response);
        setError("Unexpected response from server");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Login error:", error.response.data);
        setError(error.response.data.error || "Server error");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Network error:", error.request);
        setError("Network error. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error during login:", error.message);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setLoggedIn(false);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="font-semibold text-7xl uppercase">
        Inventory Management System
      </div>
      <div className="text-3xl uppercase">
        Northern Railways Locomotive Workshop, Lucknow
      </div>
      <div className="py-8 flex justify-between gap-4">
        {loggedIn ? (
          <div className="bg-white p-8 rounded-lg w-1/2 border  border-neutral-700 flex justify-center flex-col gap-8">
            <div className="text-center text-xl">Logged In Succesfully!</div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg w-1/2 border  border-neutral-700">
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
        )}
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="w-1/2 bg-cover bg-center aspect-video rounded-md"
        ></div>
      </div>
    </div>
  );
}
