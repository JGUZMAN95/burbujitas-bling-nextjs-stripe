export default function handler(req, res) {
    var _a;
    if (req.method !== "POST")
        return res.status(405).end();
    const { _id, name, price, image, quantity } = JSON.parse(req.body);
    // Read current cart from cookie
    const cookie = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("; ").find((c) => c.startsWith("cart="));
    const currentCart = cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : [];
    const imageUrl = image || "/placeholder.png";
    const existing = currentCart.find((item) => item._id === _id);
    if (existing) {
        existing.quantity += quantity;
    }
    else {
        currentCart.push({ _id, name, price, image: imageUrl, quantity });
    }
    res.setHeader("Set-Cookie", `cart=${encodeURIComponent(JSON.stringify(currentCart))}; Path=/; Max-Age=31536000`);
    res.status(200).json({ cart: currentCart });
}
