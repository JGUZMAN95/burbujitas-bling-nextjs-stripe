// utils/cookies.ts

// Set a cookie with optional expiration (days)
export function setCookie(name: string, value: any, days = 7) {
  if (typeof document === "undefined") return; // SSR safety

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // Convert value to JSON and encode it
  const stringValue = encodeURIComponent(JSON.stringify(value));

  document.cookie = `${name}=${stringValue}; expires=${expires.toUTCString()}; path=/`;
}

// Read a cookie and parse JSON
export function getCookie<T = any>(name: string): T | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return null;
  }
}

// Delete a cookie
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
}
