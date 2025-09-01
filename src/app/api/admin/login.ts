// /pages/api/admin/login.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    // ✅ password matches
    res.setHeader(
      "Set-Cookie",
      `admin-auth=true; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}` // 1 day
    );
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: "Invalid password" });
}
