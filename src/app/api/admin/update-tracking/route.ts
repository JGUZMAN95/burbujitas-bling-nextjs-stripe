import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getOrderEmailHtml } from "@/utils/orderEmailTemplate";
import { logServerError } from "@/lib/log-server-error";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_LIVE_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { CHECKOUT_SESSION_ID, trackingUrl } = await req.json();
    console.log("📦 Update tracking request:", {
      CHECKOUT_SESSION_ID,
      trackingUrl,
    });

    // ✅ Validate input
    if (!CHECKOUT_SESSION_ID || !trackingUrl) {
      return NextResponse.json(
        { error: "Checkout Session ID and Tracking URL are required" },
        { status: 400 }
      );
    }
    if (!CHECKOUT_SESSION_ID.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Invalid Checkout Session ID format" },
        { status: 400 }
      );
    }

    // ✅ Fetch Stripe session with line items
    const sessionData = await stripe.checkout.sessions.retrieve(
      CHECKOUT_SESSION_ID,
      {
        expand: ["line_items.data.price.product"],
      }
    );

    if (!sessionData?.customer_details?.email) {
      return NextResponse.json(
        { error: "Customer email not found in checkout session" },
        { status: 400 }
      );
    }

    // ✅ Send email
    try {
      console.log(
        "📧 Sending shipment email to:",
        sessionData.customer_details.email
      );

      await resend.emails.send({
        from: `Burbujitas & Bling <${process.env.EMAIL_FROM_ORDERS!}>`,
        //to: sessionData.customer_details.email!,
        to: "delivered@resend.dev",
        subject: "Your Burbujitas & Bling Order Has Shipped!",
        html: getOrderEmailHtml({
          sessionData: sessionData,
          trackingUrl: trackingUrl,
        }),
      });

      console.log("✅ Shipment email sent successfully!");

      return NextResponse.json(
        { message: "Shipment confirmation email sent successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      await logServerError({
        message: err.message,
        stack: err.stack,
        endpoint: "POST /api/admin/update-tracking",
      });
      console.error("❌ Failed to send shipment email:", err);

      return NextResponse.json(
        { error: "Failed to send shipment email" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    await logServerError({
      message: error.message,
      stack: error.stack,
      endpoint: "POST /api/admin/update-tracking",
    });
    console.error("❌ Internal server error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
