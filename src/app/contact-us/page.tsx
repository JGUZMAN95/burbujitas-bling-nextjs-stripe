"use client";

import Button from "@/components/Buttons/StaticButton";
import { useState, useEffect, useRef } from "react";

export default function ContactUs() {
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status) {
      setVisible(true);

      // Clear any existing timer before setting a new one
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setVisible(false);
        timerRef.current = null;
      }, 2500);
    }
  }, [status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus({
          type: "success",
          message: result.message || "Your message has been sent!",
        });
        formElement.reset();
      } else {
        setStatus({
          type: "error",
          message: result.message || "Oops! Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center font-accent text-softCoral px-4 py-4">
      <form
        className="w-full max-w-sm bg-softWhite/60 shadow-md p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="col-span-1 md:col-span-2 flex justify-center md:justify-start">
          <header className="text-lg font-bold">Contact Us</header>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name:</label>
          <input
            name="name"
            type="text"
            className="bg-softWhite w-full shadow p-2 focus:outline-none focus:ring-2 focus:ring-softCoral"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email:</label>
          <input
            name="email"
            type="email"
            className="bg-softWhite w-full shadow p-2 focus:outline-none focus:ring-2 focus:ring-softCoral"
            required
          />
        </div>

        {/* Message */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-semibold">Message:</label>
          <textarea
            rows={4}
            className="bg-softWhite w-full shadow p-2 focus:outline-none focus:ring-2 focus:ring-softCoral"
            name="message"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <Button className="w-full" disabled={loading} aria-busy={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>

          {/* Status Message */}
          {status && (
            <div
              role="status"
              aria-live="polite"
              className={`col-span-1 md:col-span-2 mt-2 text-center rounded p-2 transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              } ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
