"use client";

import { useState, useEffect } from "react";
import { deleteCookie, getCookie } from "@/utils/cookies";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [trackingData, setTrackingData] = useState({
    orderId: "",
    trackingUrl: "",
    estimatedDelivery: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loadingSync, setLoadingSync] = useState(false);
  const [loadingTracking, setLoadingTracking] = useState(false);

  // Check login on mount
  useEffect(() => {
    const cookie = getCookie("admin-auth");
    setIsLoggedIn(cookie === "true");
  }, []);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        setMessage({ type: "success", text: "Login successful!" });
        setPassword("");
      } else if (res.status === 401) {
        setMessage({ type: "error", text: "Incorrect Password" });
        setPassword("");
      } else {
        setMessage({ type: "error", text: "Server error, try again." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    }
  };

  const handleLogout = () => {
    deleteCookie("admin-auth");
    setIsLoggedIn(false);
    setMessage(null);
  };

  // Sync Products
  const handleSync = async () => {
    setLoadingSync(true);
    setMessage({ type: "success", text: "Syncing..." });
    try {
      const res = await fetch("/api/stripe-apis/sync-products", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: `✅ Synced ${data.synced.length} products!`,
        });
      } else {
        setMessage({
          type: "error",
          text: "❌ Sync failed: " + (data.error || ""),
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "❌ Sync failed: " + err });
    } finally {
      setLoadingSync(false);
    }
  };

  // Update tracking info
  const handleUpdateTracking = async () => {
    if (!trackingData.orderId || !trackingData.trackingUrl) {
      setMessage({
        type: "error",
        text: "Order ID and Tracking URL are required",
      });
      return;
    }
    setLoadingTracking(true);
    setMessage({ type: "success", text: "Updating tracking..." });
    try {
      const res = await fetch("/api/admin/update-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: `✅ Tracking updated and email sent for order ${trackingData.orderId}`,
        });
        setTrackingData({
          orderId: "",
          trackingUrl: "",
          estimatedDelivery: "",
        });
      } else {
        setMessage({
          type: "error",
          text: "❌ " + (data.error || "Failed to update tracking"),
        });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Failed to update tracking" });
    } finally {
      setLoadingTracking(false);
    }
  };

  // --- LOGIN FORM ---
  if (!isLoggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <input
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-softCoral text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
        {message && (
          <p
            className={`mt-2 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}
          >
            {message.text}
          </p>
        )}
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stripe Sync Admin</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <button
        onClick={handleSync}
        disabled={loadingSync}
        className="bg-softCoral text-white px-4 py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingSync ? "Syncing..." : "Sync Products"}
      </button>

      <div className="space-y-3">
        <h2 className="text-xl font-bold">Update Tracking</h2>
        <input
          type="text"
          placeholder="Order Number"
          value={trackingData.orderId}
          onChange={(e) =>
            setTrackingData((prev) => ({ ...prev, orderId: e.target.value }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Tracking URL"
          value={trackingData.trackingUrl}
          onChange={(e) =>
            setTrackingData((prev) => ({
              ...prev,
              trackingUrl: e.target.value,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Estimated Delivery (optional)"
          value={trackingData.estimatedDelivery}
          onChange={(e) =>
            setTrackingData((prev) => ({
              ...prev,
              estimatedDelivery: e.target.value,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleUpdateTracking}
          disabled={loadingTracking}
          className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingTracking ? "Updating..." : "Update Tracking & Send Email"}
        </button>
      </div>

      {message && (
        <p
          className={`p-2 rounded text-center ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
