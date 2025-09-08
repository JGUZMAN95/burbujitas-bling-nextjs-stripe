"use client";

import { useEffect, useState, Suspense } from "react";
import CartCleanUp from "@/components/Cart/CartCleanUp";
import SuccessLine from "@/components/Cart/success";
import { logServerError } from "@/lib/log-server-error";

type LineItem = {
  id: string;
  quantity: number;
  price: {
    unit_amount: number;
    product: {
      name: string;
      images: string[];
      metadata: {
        category: string;
        slug: string;
      };
    };
  };
};

type SessionData = {
  line_items?: { data: LineItem[] };
  total_details?: { amount_discount?: number };
  amount_subtotal?: number;
  amount_total?: number;
  shipping_cost?: { amount_total?: number };
  customer_details?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
    };
  };
};

export default function OrderConfirmation() {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Getting session_id to update frontend order confirmation.
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (!sessionId) {
      setLoading(false);
      return;
    }

    // TODO: Update to server component and use suspense intead of useEffect.
    // Fetching URL after trigger from success is invoked.
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/stripe-apis/get-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });
        if (!res.ok) throw new Error(`Failed to fetch session: ${res.status}`);

        const data: SessionData = await res.json();

        setSessionData(data);
        console.log("Fetched session data HERE:", data);
      } catch (err: any) {
        console.error("OrderConfirmation Error:", err);
        setError("Unable to load order details. Please contact support.");
        await logServerError({
          message: err.message,
          stack: err.stack,
          endpoint: "POST /app/success/page.tsx",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <main className="justify-center place-items-center min-h-full py-4 px-4">
      <div className="w-full max-w-2xl">
        <CartCleanUp />
      </div>

      <div className="w-full max-w-2xl">
        {sessionData ? (
          <SuccessLine sessionData={sessionData} />
        ) : (
          <p className="text-center mt-4 sm:mt-0">Loading order details…</p>
        )}
      </div>
    </main>
  );
}
