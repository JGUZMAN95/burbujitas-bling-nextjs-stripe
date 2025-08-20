"use client";

import { useState, useEffect } from "react";
import { deleteCookie, getCookie } from "@/utils/cookies";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login on mount
  useEffect(() => {
    const cookie = getCookie("admin-auth");
    setIsLoggedIn(cookie === "true");
  }, []);

  // Handle login
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        setMessage("Login successful!");
      } else if (res.status == 401) {
        setMessage("Incorrect Password");
      } else {
        setMessage("Server error, try again.");
      }
    } catch {
      setMessage("Something went wrong. Try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    deleteCookie("admin-auth");
    setIsLoggedIn(false);
  };

  // Handle Stripe Sync
  const handleSync = async () => {
    setMessage("Syncing...");
    try {
      const res = await fetch("/api/stripeApis/syncProducts", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Synced ${data.synced.length} products!`);
      } else {
        setMessage("❌ Sync failed: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Sync failed: " + err);
    }
  };

  // Show login if not logged in
  if (!isLoggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border p-2 w-full rounded mb-2"
        />
        <button
          onClick={handleLogin}
          className="bg-softCoral text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    );
  }

  // Show admin dashboard
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Stripe Sync Admin</h1>
      <div className="flex gap-4">
        <button
          onClick={handleSync}
          disabled={message === "Syncing..."}
          className="bg-softCoral text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {message === "Syncing..." ? "Syncing..." : "Sync Products"}
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
