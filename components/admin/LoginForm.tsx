"use client"

import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error

    // Replace this URL with your API endpoint
    const apiUrl = "/api/adminlogin"; 

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      // Successful login (200 OK)
      const data = await response.json();
      console.log(data);
      // Handle successful login (e.g., redirect to dashboard)
      window.location.href = "admin/dashboard"; // Redirect to the dashboard page
    } else if (response.status === 401) {
      // Invalid credentials
      setError("Invalid credentials. Please try again.");
    } else {
      // Handle other API errors
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-slate-900 text-white font-semibold rounded-md transition duration-200 hover:bg-slate-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
