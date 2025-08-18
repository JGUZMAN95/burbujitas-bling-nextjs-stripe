// /src/pages/api/cart.ts
import { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "@/src/lib/sanity/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cartCookie = req.cookies.cart || "[]";
  const cart = JSON.parse(cartCookie);

  const enriched = await Promise.all(
    cart.map(async (item: { _id: string; quantity: number }) => {
      const product = await sanityClient.fetch(
        `*[_type == "product" && _id == $id][0]{ 
          _id, 
          name, 
          price, 
          "image": image.asset->url 
        }`,
        { id: item._id }
      );

      return product
        ? { ...product, quantity: item.quantity }
        : { _id: item._id, name: "Unknown", price: 0, image: "/placeholder.png", quantity: item.quantity };
    })
  );

  res.status(200).json(enriched);
}
