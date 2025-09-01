import { useEffect } from "react";
// Todo: Ensure any other cart state is also cleared if needed.
// This component clears the cart cookie and updates the cart state.
export default function CartCleanUp() {
  useEffect(() => {
    const clearCart = () => {
      document.cookie = "cart=; path=/; max-age=0";
      window.dispatchEvent(new Event("cart-updated"));
    };
    clearCart();
  }, []);

  return null; // renders nothing
}
