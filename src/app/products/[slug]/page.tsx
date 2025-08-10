import Image from 'next/image'
import { sanityClient, urlFor } from '@/lib/sanity/client'
import { Product } from '@/src/types/product'

type Props = {
  params: { slug: string }
}

const query = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  description,
  price,
  image
}`

export default async function ProductPage({ params }: Props) {
  const product: Product | null = await sanityClient.fetch(query, { slug: params.slug })

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <Image
        src={urlFor(product.image).url()}
        alt={product.name}
        width={500}
        height={500}
        className="object-cover w-full h-auto"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg mt-2">{product.description}</p>
      <p className="text-md font-semibold mt-2">${product.price}</p>
    </div>
  )
}
