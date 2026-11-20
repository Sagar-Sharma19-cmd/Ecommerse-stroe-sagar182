# Saltline - E-Commerce Store

**Unit 4 EL (UQ25CA752A - WAF-II), Project 7 of 10**
Sagar Rajkumar Sharma - PES1PG25CA182 - Section C

A small, working e-commerce demo built with Next.js 16 (App Router) and
TypeScript, covering the assignment's three core concepts:

1. **Dynamic Routes** - `app/products/[id]/page.tsx`, with a real `not-found`
   state for unknown product IDs.
2. **State Management** - `components/CartProvider.tsx`, a React
   Context + `useReducer` cart shared across the whole app.
3. **API Integration** - `app/api/products/route.ts`, a Route Handler the
   products page calls with `fetch`, including a `?fail=1` mode and a
   "Simulate API failure" switch (with a Try again button) to demonstrate
   the loading/error states for real.

The products page also has product search and category filters.

Theme: Sea Salt (60%, backgrounds/surfaces), Denim Navy (30%, header/
headings/structure), Kumquat Orange (10%, buttons/badges/price) - see
`app/globals.css` for the exact palette.

## Run it locally

```bash
unzip ecommerce-store.zip
cd ecommerce-store
npm install
npm run dev
```

Open http://localhost:3000 - it redirects you nowhere automatically, click
**Shop the collection** on the home page.

To build and run the production build instead:

```bash
npm run build
npm start
```

## What to actually test (matches the assignment's checklist)

- Open `/products` - products load from `/api/products`.
- Type in the search box / pick a category chip; search for nonsense to see
  the no-match message.
- Switch on **Simulate API failure** on the shop page - see the real error
  state (calls `/api/products?fail=1`, which returns a genuine 500), then
  press **Try again**.
- Click any product - opens `/products/<id>`. Visit `/products/does-not-exist`
  directly to see the real Next.js not-found page.
- Add the same product twice - quantity becomes 2, not two separate lines.
- Open `/cart` - adjust quantities, remove a line, watch the subtotal/total
  recalculate, then **Place Order** for the (non-payment) confirmation.

## Project structure

```
app/
  page.tsx                  home / landing
  products/page.tsx         product grid (Client Component, fetches API)
  products/[id]/page.tsx    product detail (dynamic route, Server Component)
  products/[id]/AddToCartButton.tsx
  products/[id]/not-found.tsx
  cart/page.tsx              cart + checkout summary
  api/products/route.ts      Route Handler (GET, supports ?fail=1)
components/
  CartProvider.tsx           Context + useReducer cart state
  Navbar.tsx                 header with live cart badge
  ProductCard.tsx
lib/
  products.ts                synthetic sample catalog data
```

No `.env`, secrets, real product/vendor data, or payment integration is
used anywhere, per the assignment's scope rules.

## Deploying to Vercel

```bash
npm install -g vercel   # if you don't already have the CLI
vercel login             # one-time, opens a magic-link/OAuth flow
vercel --prod
```

No environment variables are required - this project has no database or
external API keys, so the default settings deploy as-is. After it deploys,
open the production URL and re-run the test checklist above against it
(the assignment requires confirming the production deployment was tested,
not just that it built).
