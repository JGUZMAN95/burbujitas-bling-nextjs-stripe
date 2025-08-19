export const getProducts = `*[_type == "product"]{
  _id,
  name,
  slug,
  price,
  image,
  productType
}`;
