// Use only for global search.
export const allProductsQuery = `
  *[_type == "product"]{
    _id,
    name,
    "slug": slug.current, // flatten,
    price,
    images,
    category,
    color,
  }
`;

// Needs category variable passed and will filter through this querie.
export const productsByCategoryQuery = `
  *[_type == "product" && category == $category]{
    _id,
    name,
    "slug": slug.current, // flatten
    images,
    category,
    price,
    color,
  }
`;
// Use only for full product details.
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current, // flatten
    description,
    price,
    images,
    category,
    color,
    stripePriceId,
    stripeProductId,
    stripeQuantity
  }
`;
