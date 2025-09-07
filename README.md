## Burbujitas & Bling ✨

A modern e-commerce site showcasing handmade rings, bracelets, anklets, and necklaces — built with Next.js, Sanity CMS, Tailwind CSS, and Stripe, and deployed on Netlify.

Burbujitas & Bling is a playful, bilingual jewelry store website focused on handmade and personalized pieces.

## 🚀 Features

🛍️ Dynamic product pages powered by Sanity CMS

💳 Secure checkout with Stripe

🍪 Cookie-based shopping cart (add, remove, update)

🎠 Product galleries with Swiper.js

🔑 Admin login for quick product management

## 🛠️ Tech Stack

Frontend: Next.js (TypeScript), Tailwind CSS

CMS: Sanity

Payments: Stripe

Hosting: Netlify

## 📦 Project Goals

This project was built both as:

A real jewelry storefront for Burbujitas & Bling

A developer portfolio piece showcasing full-stack skills in modern web development

## 🗺️ Roadmap
## 1. Setup & Configuration

Initialize Next.js app with TypeScript

Connect to Sanity CMS

Configure environment variables securely

Create reusable Sanity client

## 2. Data Modeling

Define product schema in Sanity (product.ts)

Include fields for name, price, description, images, slug, metadata

## 3. Product Pages

Responsive product grid with cards

Dynamic routes for product detail pages

Fetch content via GROQ queries

## 4. Styling & UI Enhancements

Tailwind CSS for layout and accessibility

Hover states + interactive elements

Swiper.js galleries

## 5. Deployment

Deploy to Netlify with environment variables

Configure CI/CD

Test live site thoroughly

---

## ⚙️ Environment Variables

Add a `.env.local` file to your project root with:

```bash
ADMIN_SECRET_PASSWORD=

EMAIL_FROM_ORDERS=
EMAIL_FROM_SUPPORT=
EMAIL_TO=
RESEND_API_KEY=
NEXT_BASE_URL=

NEXT_PUBLIC_SANITY_API_VERSION=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
SANITY_SECRET_WRITE=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

📂 Project Structure Overview
.
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── PROJECT_STRUCTURE.md
├── public
│   ├── favicon.ico
│   ├── fonts
│   │   └── my-font-regular.woff2
│   └── images
│       ├── body
│       │   ├── coming-soon.png
│       │   └── Owner.png
│       ├── care-tips
│       │   ├── perfume.png
│       │   ├── scrub.png
│       │   ├── sleep.png
│       │   ├── storage.png
│       │   └── swimming.png
│       ├── fallbacks
│       │   └── placeholder.png
│       ├── icons
│       │   ├── empty-bag.png
│       │   ├── instagram 2.svg
│       │   ├── instagram.svg
│       │   ├── linktree.svg
│       │   ├── shopping-bag.png
│       │   ├── tiktok.svg
│       │   └── trash-bin.png
│       └── logos
│           ├── logo-blue.png
│           ├── logo-multi.png
│           ├── logo-pink.png
│           ├── logo-white.png
│           ├── logo.png
│           ├── logo1.png
│           ├── logo2.png
│           └── logo3.png
├── README.md
├── src
│   ├── app
│   │   ├── about-us
│   │   │   └── page.jsx
│   │   ├── admin
│   │   │   └── login
│   │   ├── api
│   │   │   ├── admin
│   │   │   ├── contact-us
│   │   │   ├── stripe-apis
│   │   │   └── webhooks
│   │   ├── care-tips
│   │   │   └── page.tsx
│   │   ├── checkout
│   │   │   └── page.tsx
│   │   ├── contact-us
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── policies
│   │   │   └── page.tsx
│   │   ├── product
│   │   │   └── [category]
│   │   └── success
│   │       └── page.tsx
│   ├── components
│   │   ├── Body
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ImageComponent.tsx
│   │   ├── Buttons
│   │   │   ├── ClickableImage.tsx
│   │   │   ├── FavoriteHeart.tsx
│   │   │   ├── Heart.tsx
│   │   │   └── StaticButton.tsx
│   │   ├── Cards
│   │   │   ├── DynamicProductCard.tsx
│   │   │   ├── OverviewProductCard.tsx
│   │   │   └── ProductGallery.tsx
│   │   ├── Cart
│   │   │   ├── AddToCartButton.tsx
│   │   │   ├── CartCleanUp.ts
│   │   │   ├── CartSummary.tsx
│   │   │   ├── LoadStripe.tsx
│   │   │   └── success.tsx
│   │   └── FavoritesContext.tsx
│   ├── constants
│   │   └── nav-links.ts
│   ├── lib
│   │   ├── log-server-error.ts
│   │   ├── sanity-client.ts
│   │   └── stripe.ts
│   ├── styles
│   │   └── globals.css
│   ├── types
│   │   ├── flatten-queries.ts
│   │   ├── order-type.ts
│   │   └── product-type.ts
│   └── utils
│       ├── cookies.ts
│       └── orderEmailTemplate.ts
├── structure.txt
├── studio-kobrabubbles
│   ├── delete-orders.js
│   ├── eslint.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── sanity.cli.ts
│   ├── sanity.config.ts
│   ├── schemaTypes
│   │   ├── index.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── server-logs.ts
│   ├── static
│   └── tsconfig.json
├── tailwind.config.js
└── tsconfig.json

39 directories, 81 files

🎉 Acknowledgments
Built with Next.js

Powered by Sanity CMS

Styled with Tailwind CSS

Deployed on Netlify

Thank you for checking out Burbujitas & Bling! 🌟
```
