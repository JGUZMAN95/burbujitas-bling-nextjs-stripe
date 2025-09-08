"use client";

import { useEffect, useMemo, useState } from "react";
import ImageComponent from "../Body/ImageComponent";
import ClickableImage from "../Buttons/ClickableImage";
import Button from "../Buttons/StaticButton";
import Image from "next/image";
import { getCookie, setCookie } from "@/utils/cookies";
import Link from "next/link";
import { Product } from "@/types/product-type";
import handleCheckout from "@/components/Cart/LoadStripe";
import { logServerError } from "@/lib/log-server-error";

//TODO:
// Split into components:
// CartItemRow for individual product row.
// CartEmptyState for empty cart.
// CartTotals for subtotal and checkout.
export default function CartSummary() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const getCart = (): Product[] => {
    const cookieCart = getCookie("cart");
    const parsed =
      typeof cookieCart === "string" ? JSON.parse(cookieCart) : cookieCart;

    if (!cookieCart) {
      console.error("Failed to parse cart cookie:", cookieCart);
      return [];
    }

    return parsed;
  };

  const showStatus = (message: string, duration = 3000) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(null), duration);
  };

  // Sync cart state with cookie on mount and when cookie changes.
  useEffect(() => {
    const handler = () => setCartItems(getCart());
    window.addEventListener("cart-updated", handler, { passive: true });
    setCartItems(getCart());
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  // Update item quantity in cart.
  const updateQuantity = (_id: string, delta: number) => {
    const newCart = cartItems
      .map((item) =>
        item._id === _id
          ? { ...item, quantity: (item.quantity || 1) + delta }
          : item
      )
      .filter((item) => item.quantity! > 0);

    setCartItems(newCart);
    setCookie("cart", newCart, 3);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (_id: string) => {
    const newCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(newCart);
    setCookie("cart", newCart, 3);
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Calculate subtotal.
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + Number(item.price) * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  if (!cartItems.length)
    return (
      <div className="text-center place-items-center gap-4 py-10 p-2">
        <Image
          src="/images/icons/shopping-bag.png"
          alt="Burbujitas & Bling"
          width={100}
          height={100}
        />
        <p>
          Opsies... <br />
          Your cart is empty
        </p>

        <Link
          href={`/`}
          /* Call a close function instead. This avoids relying on global events.*/
          onClick={() => window.dispatchEvent(new Event("close-cart"))}
        >
          <Button className="w-full bg-softBlue/60">Shop Till You Drop</Button>
        </Link>
      </div>
    );

  return (
    <div className="justify-center items-center min-h-full py-7">
      <div className="font-body justify-center max-w-full w-full mx-auto py-5 px-4">
        <h1 className="text-base uppercase pb-4">Your Carito</h1>

        <ul>
          {cartItems.map((item) => (
            <li>
              <div key={item._id} className=" border-softBrown/10 gap-2 pb-4">
                <div className="flex justify-between items-start mb-4 border-b border-softBrown/20">
                  <p className="font-bold whitespace-nowrap">
                    {item.name} | ${Number(item.price).toFixed(2)}
                  </p>
                  {/* Trash icon */}
                  <button
                    className="mb-2"
                    aria-label="remove"
                    onClick={() => removeItem(item._id)}
                  >
                    <Image
                      src="/images/icons/trash-bin.png"
                      alt="remove"
                      width={24}
                      height={24}
                      priority
                    />
                  </button>
                </div>

                {/* Product details + quantity + price */}
                <div className="justify-between items-center h-full flex gap-4">
                  <div className="w-24 h-24 relative aspect-square">
                    <ClickableImage
                      productType={item.category}
                      productSlug={item.slug}
                    >
                      <ImageComponent image={item.images[0]} />
                    </ClickableImage>
                  </div>
                  <div
                    className={`flex h-[2rem] px-3 gap-5 justify-center place-items-start items-center transition-fade-in duration-500 ${
                      item.quantity === 1 ? "bg-softCoral/20" : "bg-softPink/60"
                    }`}
                  >
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQuantity(item._id, -1)}
                    >
                      <span className="text-lg font-bold">−</span>
                    </button>
                    {item.quantity}
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => updateQuantity(item._id, 1)}
                    >
                      <span className="text-lg font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Totals + Checkout */}
        <div className="grid mt-4">
          <div className="grid grid-cols-2 font-bold text-base font-accent">
            <p className="text-left">Subtotal:</p>
            <p className="text-right">${subtotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Checkout button */}
        <div className="grid w-full mt-2">
          <Button
            onClick={() =>
              handleCheckout({ cart: cartItems, onStatus: showStatus })
            }
          >
            Next Step
          </Button>{" "}
          <p className="text-center text-softBrown text-xs mt-1">
            Taxes and shipping calculated at checkout
          </p>
          {/* Status message display */}
          {statusMessage && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-softCoral text-white px-4 py-2 rounded shadow-md">
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
