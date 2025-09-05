// lib/logServerError.ts
import { serverSanityClient } from "./sanity-client";

export async function logServerError({
  message,
  stack,
  endpoint,
}: {
  message: string;
  stack?: string;
  endpoint?: string;
}) {
  try {
    await serverSanityClient.create({
      _type: "serverError",
      message,
      stack: stack || "",
      endpoint: endpoint || "unknown",
      occurredAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to log server error to Sanity:", err);
  }
}
