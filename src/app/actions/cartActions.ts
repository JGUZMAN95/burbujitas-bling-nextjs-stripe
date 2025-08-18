export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price?: number;
}

// Get cart from cookies
export function getCart(): CartItem[] {
  const cookie = document.cookie.split("; ").find((c) => c.startsWith("cart="));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1])) as CartItem[];
  } catch {
    return [];
  }
}

// Save cart to cookies
export function setCart(cart: CartItem[]) {
  document.cookie =
    "cart=" + encodeURIComponent(JSON.stringify(cart)) + "; path=/; max-age=" + 7 * 24 * 60 * 60;
}

// Add item
export function addItemToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...item, quantity: 1 });
  setCart(cart);

  // Trigger live update
  window.dispatchEvent(new Event("cart-updated"));
}

// Get total quantity
export function getCartQuantity(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
