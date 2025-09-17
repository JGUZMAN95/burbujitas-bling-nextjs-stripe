"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Button from "../Buttons/StaticButton";
import ClickableImage from "../Buttons/ClickableImage";
import ImageComponent from "../Body/ImageComponent";
import { getCookie, setCookie } from "@/utils/cookies";
import handleCheckout from "@/components/Cart/LoadStripe";
import { client } from "@/lib/sanity-client";
import { Product } from "@/types/product-type";

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface ProductImageMap {
  [key: string]: any; // key = `${category}-${slug}`, value = sanity image object
}

// Fetch images for all cart items in one query
async function fetchProductImages(
  cartItems: CartItem[]
): Promise<ProductImageMap> {
  if (!cartItems.length) return {};

  const slugs = cartItems.map((i) => i.slug);
  const categories = cartItems.map((i) => i.category);

  const query = `*[_type == "product" && slug.current in $slugs && category in $categories]{
    "key": category + "-" + slug.current,
    "image": images[0]
  }`;

  const results = await client.fetch(query, { slugs, categories });

  return results.reduce((acc: ProductImageMap, item: any) => {
    acc[item.key] = item.image;
    return acc;
  }, {});
}

export default function CartSummary() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [imageMap, setImageMap] = useState<ProductImageMap>({});

  // Sync with cookies
  useEffect(() => {
    const handler = async () => {
      const cookieCart = getCookie("cart");
      if (Array.isArray(cookieCart)) {
        setCartItems(cookieCart);
        const imgs = await fetchProductImages(cookieCart);
        setImageMap(imgs);
      } else {
        setCartItems([]);
        setImageMap({});
      }
    };
    window.addEventListener("cart-updated", handler);
    handler();
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  const updateQuantity = (_id: string, delta: number) => {
    const newCart = cartItems
      .map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max((item.quantity || 1) + delta, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(newCart);
    setCookie("cart", newCart, 7);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (_id: string) => {
    const newCart = cartItems.filter((item) => item._id !== _id);
    setCartItems(newCart);
    setCookie("cart", newCart, 7);
    window.dispatchEvent(new Event("cart-updated"));
  };

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
      <div className="text-center place-items-center md:py-20 p-4">
        <Image
          src="/images/icons/shopping-bag.png"
          alt="empty cart"
          width={75}
          height={75}
        />
        <p>
          Oopsies
          <br />
          Your cart is empty...
        </p>
        <Button
          onClick={() => window.dispatchEvent(new Event("close-cart"))}
          className="bg-softPink/90 mt-5"
        >
          Shop Till You Drop
        </Button>
      </div>
    );

  return (
    <div className="relative flex flex-col h-screen">
      {/* Scrollable cart items */}
      <div className="flex-1 overflow-y-auto font-body max-w-full w-full mx-auto px-4 pb-14">
        <ul>
          {cartItems.map((item) => {
            const key = `${item.category}-${item.slug}`;
            const image = imageMap[key];

            return (
              <li key={item._id}>
                <div className="border-softBrown/10 gap-2 pb-4">
                  <div className="flex justify-between items-start mb-4 border-b border-softBrown/20">
                    <p className="font-bold whitespace-nowrap text-base">
                      {item.name} | ${Number(item.price).toFixed(2)}
                    </p>
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

                  <div className="justify-between items-start h-full text-sm flex gap-2">
                    <div className="md:w-20 w-13 h-13 relative aspect-square">
                      <ClickableImage
                        productType={item.category}
                        productSlug={item.slug}
                      >
                        {image ? (
                          <ImageComponent image={image} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-softWhite/40">
                            <span className="text-xs text-softBrown">
                              Loading...
                            </span>
                          </div>
                        )}
                      </ClickableImage>
                    </div>

                    <div className="flex flex-col gap-2">
                      {item.selectedSize && (
                        <span>Length: {item.selectedSize}"</span>
                      )}
                      {item.selectedColor && (
                        <span>Color: {item.selectedColor}</span>
                      )}
                    </div>

                    <div
                      className={`flex h-[2rem] px-3 gap-3 items-center transition-fade-in duration-500 ${
                        item.quantity === 1
                          ? "bg-softCoral/20"
                          : "bg-softPink/60"
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
            );
          })}
        </ul>
      </div>

      {/* Checkout bar pinned at bottom */}
      <div className="sticky bottom-0 w-full bg-softWhite/60 z-20 backdrop-blur-sm p-4 border-t border-softBrown/20">
        <div className="grid grid-cols-2 font-bold text-base font-accent">
          <p className="text-left">Subtotal:</p>
          <p className="text-right">${subtotal.toFixed(2)}</p>
        </div>

        <div className="w-full mt-2">
          <Button
            className="bg-softYellow"
            onClick={() => handleCheckout({ cart: cartItems })}
          >
            Next Step
          </Button>
          <p className="text-center text-softBrown text-xs mt-1">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
