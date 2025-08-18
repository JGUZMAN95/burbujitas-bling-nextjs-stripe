"use client";

import React, { useState, useEffect } from "react";
import type { Product} from "@/src/types/product";
import type { CartProduct } from "@/src/types/cart";

export default function ClientCart() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // Save cart whenever it updates
  const updateCart = (updated: CartProduct[]) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Increase quantity
  const incrementQuantity = (product: CartProduct) => {
    const updated = cart.map((p) =>
      p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
    );
    updateCart(updated);
  };

  // Decrease quantity (min 1)
  const decrementQuantity = (product: CartProduct) => {
    const updated = cart.map((p) =>
      p._id === product._id && p.quantity > 1
        ? { ...p, quantity: p.quantity - 1 }
        : p
    );
    updateCart(updated);
  };

  // Remove product entirely
  const removeFromCart = (product: CartProduct) => {
    const updated = cart.filter((p) => p._id !== product._id);
    updateCart(updated);
  };

  // Calculate total
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items yet!</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                />
              )}
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p>Qty: {item.quantity}</p>

              <button onClick={() => decrementQuantity(item)}>-</button>
              <button onClick={() => incrementQuantity(item)}>+</button>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}

          <hr />
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}
