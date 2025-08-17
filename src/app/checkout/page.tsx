"use client";

import { useCart } from "@/src/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, total, clearCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-2">
              <p>
                {item.name} x {item.quantity}
              </p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <hr className="my-4" />
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={clearCart}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
