import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Product = {
  _id: string;                   // Sanity document ID
  _createdAt: string;            // Timestamp
  name: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  image: SanityImageSource;      // Used with urlFor()
};