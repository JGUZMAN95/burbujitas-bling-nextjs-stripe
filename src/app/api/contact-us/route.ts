// app/api/contact-us/route.ts
import { logServerError } from "@/lib/log-server-error";
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const data = await req.json();
    const { name, email, message } = data;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Contact form submission:", { name, email, message });

    // Send email via Resend
    const resendResponse = await resend.emails.send({
      from: `Burbujitas & Bling <${process.env.EMAIL_FROM_SUPPORT!}>`,
      to: email,
      subject: `New Contact Form Submission from ${name || "Anonymous"}`,
      text: message,
    });
    if (resendResponse.data) {
      return NextResponse.json(
        { message: "Message sent successfully!" },
        { status: 200 }
      );
    } else {
      console.error("Resend email failed:", resendResponse);
      await logServerError({
        message: resendResponse.error.message,
        stack: " ",
        endpoint: "POST /api/stripe-apis/contact-us",
      });
    }
    // Return success JSON
  } catch (err: any) {
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/contact-us",
    });
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/contact-us",
    });
    // Return error JSON
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
