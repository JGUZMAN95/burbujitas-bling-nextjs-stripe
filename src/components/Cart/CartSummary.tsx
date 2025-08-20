"use client";

import { useEffect, useState } from "react";
import ImageComponent from "../Body/ImageComponent";
import ClickableImage from "../Buttons/ClickableImage";
import handleCheckout from "@/components/Cart/LoadStripe";
import Button from "../Buttons/StaticButton";
import Image from "next/image";
import { getCookie, setCookie } from "@/utils/cookies";
import Link from "next/link";

export default function CartSummary() {
  const [cart, setCart] = useState<any[]>([]);

  const getCart = () => getCookie("cart") ?? [];

  useEffect(() => {
    const handler = () => setCart(getCart());
    window.addEventListener("cart-updated", handler, { passive: true });
    setCart(getCart());
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  const updateQuantity = (_id: string, delta: number) => {
    const newCart = cart
      .map((item) =>
        item._id === _id
          ? { ...item, stripeQuantity: item.stripeQuantity + delta }
          : item
      )
      .filter((item) => item.stripeQuantity > 0);

    setCart(newCart);
    setCookie("cart", newCart, 3);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (_id: string) => {
    const newCart = cart.filter((item) => item._id !== _id);
    setCart(newCart);
    setCookie("cart", newCart, 3);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.stripeQuantity,
    0
  );

  if (!cart.length)
    return (
      <div className="flex flex-col justify-center items-center text-center gap-4 h-full">
        <img
          src="/images/body/emptybag.png"
          alt="Burbujitas & Bling"
          width={200}
          height={300}
          className="mt-6"
        />
        <p>
          Opsies... <br />
          Your cart is empty
        </p>

        <Link href={`/`}>
          <Button className="w-60 bg-softBlue/60">Shop Till You Drop</Button>
        </Link>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col bg-softWhite/60 font-body justify-center py-6 px-4 shadow-md max-w-xl w-full mx-auto p-2">
        <h1 className="text-base uppercase">Your Carito</h1>

        {cart.map((item) => (
          <div
            key={item._id}
            className="relative grid border-b-2 border-softBrown/10 p-2"
          >
            <div className="place-items-end">
              {/* Trash icon */}
              <button
                onClick={() => removeItem(item._id)}
                className="absolute top-2 right-2"
              >
                <Image
                  src="/images/body/TrashBin.png"
                  alt="remove"
                  width={35}
                  height={35}
                  priority
                />
              </button>
            </div>

            <div className="grid grid-cols-[auto,1fr] gap-2">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative aspect-square">
                <ClickableImage
                  productType={item.category}
                  productSlug={item.slug}
                >
                  <ImageComponent image={item.images[0]} />
                </ClickableImage>
              </div>

              {/* Product details + quantity + price */}
              <div className="place-items-start">
                <p className="font-bold whitespace-nowrap truncate">
                  {item.name} | ${item.price}
                </p>
                <div
                  className={`flex h-[2rem] px-3 gap-5 justify-center place-items-start items-center transition-fade-in duration-500 ${
                    item.stripeQuantity === 1
                      ? "bg-softCoral/20"
                      : "bg-softPink/60"
                  }`}
                >
                  <button onClick={() => updateQuantity(item._id, -1)}>
                    -
                  </button>
                  {item.stripeQuantity}
                  <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Totals + Checkout */}
        <div className="grid mt-4">
          <div className="grid grid-cols-2 font-bold text-base font-accent">
            <p className="text-left">Subtotal:</p>
            <p className="text-right">${subtotal.toFixed(2)}</p>
          </div>
        </div>

        {/* Checkout button */}
        <div className="grid w-full mt-2">
          <Button onClick={() => handleCheckout(cart)}>Next Step</Button>
          <p className="text-center text-softBrown text-bold text-xs text-gray-600 mt-1">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
