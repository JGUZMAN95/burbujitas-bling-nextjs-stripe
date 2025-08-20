import { useEffect } from "react";

export default function CartCleanUp() {
  useEffect(() => {
    // Clear the cart cookie
    document.cookie = "cart=; path=/; max-age=0";
    // Dispatch event to update any cart badges
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  return null; // renders nothing
}
