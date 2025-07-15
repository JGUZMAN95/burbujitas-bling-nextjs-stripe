# Burbujitas & Bling

A modern e-commerce site showcasing handmade rings, bracelets, anklets, and necklaces — built with Next.js, Sanity CMS, Tailwind CSS, and deployed on Netlify.

---

## 🚀 Project Overview

**Burbujitas & Bling** is a playful, bilingual jewelry store website focused on handmade and personalized pieces. This project aims to:

- Showcase products with rich images and detailed descriptions
- Provide a smooth, responsive user experience on desktop and mobile
- Enable dynamic product detail pages using Sanity CMS content
- Integrate secure environment variables for credentials
- Deploy reliably on Netlify with seamless local development

---

## 🗺️ Project Roadmap & Development Steps

### 1. Setup & Configuration
- Initialize Next.js app with TypeScript
- Connect to Sanity CMS for content management
- Configure environment variables securely (`.env.local`)
- Create reusable Sanity client (`lib/sanity/client.ts`)

### 2. Data Modeling & Schemas
- Define product schema in Sanity (`sanity/schemaTypes/product.ts`)
- Include fields for product name, price, description, images, slug, and metadata

### 3. Product Listing Page
- Fetch products from Sanity using GROQ queries
- Display product cards in a responsive grid (`src/components/ProductCard.tsx`)
- Implement product types and props for type safety

### 4. Product Detail Page with Dynamic Routing
- Create dynamic route `/products/[id].tsx`
- Use `getStaticPaths` and `getStaticProps` to generate pages for each product
- Show full product details including large image, description, price, and related info

### 5. Styling & UI Enhancements
- Use Tailwind CSS for styling and layout
- Ensure accessibility and responsive design
- Add hover states and interactive elements on product cards

### 6. Deployment
- Setup Netlify for deployment
- Configure environment variables on Netlify dashboard
- Use `.gitignore` to keep credentials safe locally
- Deploy and test live site thoroughly

---

## ⚙️ Environment Variables

Add a `.env.local` file to your project root with:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

📂 Project Structure Overview
.
├── lib/
│   └── sanity/
│       ├── client.ts       # Sanity client configuration
│       ├── config.ts       # Sanity client constants
│       └── queries.ts      # GROQ queries
├── sanity/
│   ├── schemaTypes/
│   │   └── product.ts      # Sanity schema for products
│   └── sanity.config.ts    # Sanity Studio configuration
├── src/
│   ├── components/
│   │   └── ProductCard.tsx # Product card UI component
│   ├── pages/
│   │   ├── index.tsx       # Product listing page
│   │   └── products/
│   │       └── [id].tsx    # Product detail dynamic route
│   └── styles/             # Tailwind CSS styles
├── .env.local              # Environment variables (not committed)
├── next.config.js          # Next.js config
├── package.json
└── README.md

🎉 Acknowledgments
Built with Next.js

Powered by Sanity CMS

Styled with Tailwind CSS

Deployed on Netlify

Thank you for checking out Burbujitas & Bling! 🌟
