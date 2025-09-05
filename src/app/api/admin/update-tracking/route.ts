import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getOrderEmailHtml } from "@/utils/orderEmailTemplate";
import { logServerError } from "@/lib/log-server-error";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { sessionData, trackingUrl, carrier, estimatedDelivery } =
      await req.json();

    if (!sessionData?.customer_details?.email) {
      return NextResponse.json(
        { message: "Customer email required" },
        { status: 400 }
      );
    }

    const enhancedSessionData = {
      ...sessionData,
      trackingUrl,
      carrier,
      estimatedDelivery,
    };

    await resend.emails.send({
      from: `Burbujitas & Bling <${process.env.EMAIL_FROM_ORDERS!}>`,
      to: sessionData.customer_details.email,
      subject: `Your Burbujitas & Bling Order Has Shipped!`,
      html: getOrderEmailHtml(enhancedSessionData),
    });

    return NextResponse.json(
      { message: "Shipment confirmation email sent" },
      { status: 200 }
    );
  } catch (error: any) {
    await logServerError({
      message: error.message,
      stack: error.stack,
      endpoint: "POST /api/stripe-apis/get-session",
    });
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
