// pages/products/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { productBySlugQuery } from '@/lib/sanity/queries'
import { createClient } from '@/lib/sanity/client';

type Product = {
  _id: string
  name: string
  slug: { current: string }
  price: string
  description: string
  imageUrl: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient()
  const products = await client.fetch(`*[_type == "product"]{ slug }`)

  const paths = products.map((p: { slug: { current: string } }) => ({
    params: { slug: p.slug.current },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createClient()
  const product = await client.fetch(productBySlugQuery, {
    slug: params?.slug,
  })

  return {
    props: {
      product,
    },
    revalidate: 60, // ISR: rebuild every 60s
  }
}

export default function ProductPage({ product }: { product: Product }) {
  if (!product) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="object-cover w-full h-auto"
      />
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg mt-2">{product.description}</p>
      <p className="text-md font-semibold mt-2">{product.price}</p>
    </div>
  )
}
