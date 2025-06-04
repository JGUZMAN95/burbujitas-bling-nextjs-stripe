// pages/products/[slug].tsx

import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { sanityClient, urlFor } from '@/lib/sanity/client'
import { getProducts } from '@/lib/sanity/queries'
import { Product } from '@/src/types/product'

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await sanityClient.fetch(`*[_type == "product"]{ slug }`)

  const paths = products.map((p: { slug: { current: string } }) => ({
    params: { slug: p.slug.current },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await sanityClient.fetch(getProducts, {
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
        src={urlFor(product.image).url()}
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
