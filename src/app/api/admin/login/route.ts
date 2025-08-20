// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });

    // ✅ set cookie (1 day)
    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
