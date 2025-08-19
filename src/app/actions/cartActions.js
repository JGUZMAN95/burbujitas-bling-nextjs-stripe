// Get cart from cookies
export function getCart() {
    const cookie = document.cookie.split("; ").find((c) => c.startsWith("cart="));
    if (!cookie)
        return [];
    try {
        return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    }
    catch (_a) {
        return [];
    }
}
// Save cart to cookies
export function setCart(cart) {
    document.cookie =
        "cart=" + encodeURIComponent(JSON.stringify(cart)) + "; path=/; max-age=" + 7 * 24 * 60 * 60;
}
// Add item
export function addItemToCart(item) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === item.id);
    if (existing)
        existing.quantity += 1;
    else
        cart.push(Object.assign(Object.assign({}, item), { quantity: 1 }));
    setCart(cart);
    // Trigger live update
    window.dispatchEvent(new Event("cart-updated"));
}
// Get total quantity
export function getCartQuantity() {
    return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
