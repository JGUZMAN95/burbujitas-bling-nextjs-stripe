import { logServerError } from "@/lib/log-server-error";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    if (!email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Contact form submission:", { name, email, message });

    await resend.emails.send({
      from: `Burbujitas & Bling <${process.env.EMAIL_FROM_SUPPORT!}>`,
      to: process.env.EMAIL_TO!, // send to your email
      //to: "delivered@resend.dev",
      subject: `New Contact Form Submission from ${name || "Anonymous"}`,
      text: `Name: ${name || "Anonymous"}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Contact form error:", err);
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/contact-us",
    });

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
