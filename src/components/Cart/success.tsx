"use client";

import ClickableImage from "../Buttons/ClickableImage";
import ImageComponent from "../Body/ImageComponent";

type SuccessLineProps = {
  sessionData: any;
};

export default function SuccessLine({ sessionData }: SuccessLineProps) {
  if (!sessionData) {
    return <p className="text-center font-bold">Proccesing Transaction...</p>;
  }

  const lineItems = sessionData.line_items?.data || [];

  return (
    <div className="bg-softWhite/60 font-body justify-center py-6 px-4 shadow-md max-w-2xl w-full mx-auto p-2">
      {/* Order Confirmation */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">Order Confirmed</h1>
        <h2 className="text-xl">Hi, Amiga</h2>
        <p className="mt-2">
          Your order has been received! Thanks for supporting this little
          business of mine.
          <br />
          xoxo, Jocelyn
        </p>
      </div>

      {/* Products */}
      {lineItems.map((item: any) => {
        const product = item.price.product as any;
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
                <ImageComponent image={product.images[0]} />
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
