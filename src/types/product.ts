export type Product = {
  _id: string;
  _type: "product";
  name: string;
  slug: { _type: "slug"; current: string };
  description?: string;
  price: number;
  color: string;
  image?: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
  };
  productType?: string;
};
