"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const getCart = () => {
    if (typeof window === "undefined")
        return [];
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("cart="));
    if (!cookie)
        return [];
    try {
        return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    }
    catch (_a) {
        return [];
    }
};
const setCart = (cart) => {
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=31536000`;
    window.dispatchEvent(new Event("cart-updated"));
};
export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const [cart, setCartState] = useState([]);
    useEffect(() => {
        setMounted(true);
        const handler = () => setCartState(getCart());
        window.addEventListener("cart-updated", handler);
        // initialize cart
        setCartState(getCart());
        return () => window.removeEventListener("cart-updated", handler);
    }, []);
    if (!mounted)
        return null; // prevent server/client mismatch
    const updateQuantity = (_id, amount) => {
        const newCart = cart.map((item) => item._id === _id ? Object.assign(Object.assign({}, item), { quantity: Math.max(1, item.quantity + amount) }) : item);
        setCart(newCart);
        setCartState(newCart);
    };
    const removeItem = (_id) => {
        const newCart = cart.filter((item) => item._id !== _id);
        setCart(newCart);
        setCartState(newCart);
    };
    const subtotal = cart.reduce((acc, item) => acc + Number(item.price || 0) * item.quantity, 0);
    return (<div className="min-h-screen bg-softWhite p-6 md:p-12 font-body text-softBrown">
      <h1 className="text-3xl font-heading mb-8">Your Cart</h1>

      {cart.length === 0 ? (<div className="text-center py-20">
          <p className="text-xl mb-4">Your cart is empty!</p>
          <Link href="/" className="text-softCoral font-bold hover:underline">
            Continue Shopping
          </Link>
        </div>) : (<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cart items */}
          <div className="md:col-span-8 space-y-4">
            {cart.map((item) => (<div key={item._id} className="flex items-center justify-between bg-softPink p-4 rounded shadow-sm">
                <div className="flex items-center gap-4">
                  <Image src={item.image || "/placeholder.png"} alt={item.name} width={80} height={80} className="rounded object-cover"/>
                  <div>
                    <p className="font-heading text-lg">{item.name}</p>
                    <p className="text-sm">${Number(item.price || 0).toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button onClick={() => updateQuantity(item._id, -1)} className="px-2 py-1 hover:bg-softBrown hover:text-softWhite transition">
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)} className="px-2 py-1 hover:bg-softBrown hover:text-softWhite transition">
                      +
                    </button>
                  </div>

                  <button onClick={() => removeItem(item._id)} className="text-softCoral hover:text-green font-bold transition">
                    Remove
                  </button>
                </div>
              </div>))}
          </div>

          {/* Cart summary */}
          <div className="md:col-span-4 bg-softBlue p-6 rounded shadow-md h-fit">
            <h2 className="font-heading text-2xl mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span>Estimated Shipping:</span>
              <span>${subtotal > 30 ? "0.00" : "8.00"}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span>${subtotal > 30 ? subtotal.toFixed(2) : (subtotal + 5).toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block text-center bg-softCoral text-softWhite py-3 rounded hover:bg-green transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>)}
    </div>);
}
