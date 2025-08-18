export const getProducts =
  `*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": image.asset->url,
      slug,
      productType,
      color,
    }`;
