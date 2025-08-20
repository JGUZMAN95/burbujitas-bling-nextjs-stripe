"use client";

import CartCleanUp from "@/components/Cart/CartCleanUp";
import SuccessLine from "@/components/Cart/success";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderConfirmation() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      try {
        const res = await fetch("/api/stripeApis/getSession", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await res.json();
        setSessionData(data);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      }
    };

    fetchSession();
  }, [sessionId]);
  CartCleanUp();

  return (
    <main className="flex items-center justify-center py-12 px-4">
      <SuccessLine sessionData={sessionData} />
    </main>
  );
}
