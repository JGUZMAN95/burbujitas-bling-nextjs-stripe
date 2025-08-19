"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function CartClient() {
    const [cart, setCart] = useState([]);
    // Load cart from cookie
    const loadCart = () => {
        const cookieCart = document.cookie
            .split("; ")
            .find((row) => row.startsWith("cart="));
        if (cookieCart) {
            try {
                const parsed = JSON.parse(decodeURIComponent(cookieCart.split("=")[1]));
                setCart(parsed);
            }
            catch (_a) {
                setCart([]);
            }
        }
        else {
            setCart([]);
        }
    };
    useEffect(() => {
        loadCart();
        const handler = () => loadCart();
        document.addEventListener("cart-updated", handler);
        return () => document.removeEventListener("cart-updated", handler);
    }, []);
    const updateCart = (updatedCart) => {
        document.cookie = `cart=${encodeURIComponent(JSON.stringify(updatedCart))}; path=/; max-age=${60 * 60 * 24 * 7}`;
        setCart(updatedCart);
        window.dispatchEvent(new Event("cart-updated"));
    };
    const incrementQuantity = (product) => {
        const updated = cart.map((p) => p._id === product._id ? Object.assign(Object.assign({}, p), { quantity: p.quantity + 1 }) : p);
        updateCart(updated);
    };
    const decrementQuantity = (product) => {
        const updated = cart
            .map((p) => p._id === product._id ? Object.assign(Object.assign({}, p), { quantity: Math.max(p.quantity - 1, 1) }) : p)
            .filter((p) => p.quantity !== 0);
        updateCart(updated);
    };
    const removeFromCart = (product) => {
        const updated = cart.filter((p) => p._id !== product._id);
        updateCart(updated);
    };
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    if (!cart.length)
        return <div className="p-6">Your cart is empty</div>;
    return (<div className="p-6 space-y-6">
      {cart.map((item) => (<div key={item._id} className="flex justify-between items-center border-b pb-4">
          <Link href={`/products/${item.productType}/${item.slug.current}`} className="flex-1">
            <h3 className="text-softCoral font-heading">{item.name}</h3>
          </Link>
          <div className="flex items-center space-x-2">
            <button onClick={() => decrementQuantity(item)} className="px-2 py-1 bg-gray-200 rounded">
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => incrementQuantity(item)} className="px-2 py-1 bg-gray-200 rounded">
              +
            </button>
          </div>
          <div className="text-softBrown">${(item.price * item.quantity).toFixed(2)}</div>
          <button onClick={() => removeFromCart(item)} className="ml-4 text-red-500 hover:underline">
            Remove
          </button>
        </div>))}

      <div className="text-right font-bold text-lg">Total: ${total}</div>
    </div>);
}
