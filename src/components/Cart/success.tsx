"use client";

import ClickableImage from "../Buttons/ClickableImage";
import ImageComponent from "../Body/ImageComponent";

// Types for Stripe session data.
type LineItem = {
  id: string;
  quantity: number;
  price: {
    unit_amount: number;
    product: {
      name: string;
      images: string[];
      metadata: {
        category: string;
        slug: string;
      };
    };
  };
};

// Simplified session data type.
type SessionData = {
  line_items?: { data: LineItem[] };
  total_details?: { amount_discount?: number };
  amount_subtotal?: number;
  amount_total?: number;
  shipping_cost?: { amount_total?: number };
  customer_details?: {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
    };
  };
};

// Props for the SuccessLine component.
type SuccessLineProps = {
  sessionData: SessionData;
};

// Component to display order success details.
export default function SuccessLine({ sessionData }: SuccessLineProps) {
  if (!sessionData) return null;

  const lineItems = sessionData.line_items?.data || [];
  const fullName = sessionData.customer_details?.name;
  const firstName = fullName?.trim().split(/\s+/)[0];
  return (
    <div className="bg-softWhite/60 font-body justify-center py-4 px-4 shadow-md w-full mx-auto">
      {/* Order Confirmation */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">Order Confirmed</h1>
        <h2 className="text-xl">Hi, {firstName || "Amiga"}</h2>
        <p className="mt-2">
          Your order has been received! Thanks for supporting this little
          business of mine.
          <br />
          xoxo, Jocelyn
        </p>
      </div>

      {/* Products */}
      {lineItems.map((item) => {
        const product = item.price.product ?? {
          name: "Unknown",
          images: [],
          metadata: {},
        };
        return (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-softBrown/20 p-2 gap-4"
          >
            {/* Product image */}
            <div className="md:w-32 w-20 md:h-32 h-20 flex-shrink-0">
              <ClickableImage
                productType={product.metadata.category}
                productSlug={product.metadata.slug}
              >
                <ImageComponent
                  alt="product image"
                  image={
                    product.images?.[0] ?? "/images/fallbacks/placeholder.png"
                  }
                />
              </ClickableImage>
            </div>

            {/* Product details */}
            <div className="flex-1 text-left">
              <p className="font-bold truncate">{product.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            {/* Price */}
            <div className="text-right font-bold">
              ${((item.price.unit_amount ?? 0) / 100).toFixed(2)}
            </div>
          </div>
        );
      })}

      {/* Totals and Shipping */}
      <div className="grid grid-cols-2 mt-4 w-full mx-auto gap-4">
        {/* Totals */}
        <div className="text-left">
          <p>
            Discount: $
            {((sessionData.total_details?.amount_discount ?? 0) / 100).toFixed(
              2
            )}
          </p>
          <p>
            Subtotal: ${((sessionData.amount_subtotal ?? 0) / 100).toFixed(2)}
          </p>
          <p>
            Shipping: $
            {((sessionData.shipping_cost?.amount_total ?? 0) / 100).toFixed(2)}
          </p>
          <p className="font-bold">
            Total: ${((sessionData.amount_total ?? 0) / 100).toFixed(2)}
          </p>
        </div>

        {/* Shipping details */}
        <div className="text-right">
          <p>{sessionData.customer_details?.name}</p>
          <p>{sessionData.customer_details?.address?.line1}</p>
          {sessionData.customer_details?.address?.line2 && (
            <p>{sessionData.customer_details.address.line2}</p>
          )}
          <p>
            {sessionData.customer_details?.address?.city},{" "}
            {sessionData.customer_details?.address?.state}
          </p>
          <p>{sessionData.customer_details?.address?.postal_code}</p>
        </div>
      </div>
    </div>
  );
}
