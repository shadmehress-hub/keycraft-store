# ⌨️ KeyCraft Studio — Premium Mechanical Keyboards E-Commerce

[![Live Demo](https://img.shields.io/badge/Live_Demo-keycraft--store.vercel.app-emerald?style=for-the-badge&logo=vercel&logoColor=white)](https://keycraft-store.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma 7](https://img.shields.io/badge/Prisma-7.10-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.1-orange?style=for-the-badge)](https://zustand.docs.pmnd.rs/)
[![Vitest](https://img.shields.io/badge/Vitest-13_Tests_Passed-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> A modern, production-ready Persian (RTL) e-commerce web application specializing in custom mechanical keyboards, artisan keycaps, tactile/linear switches, and minimalist desk setup accessories. Built with bleeding-edge web standards: **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, **Prisma 7**, **PostgreSQL**, and **Zustand**.

---

## 🌟 Live Demo

- **Production URL:** [https://keycraft-store.vercel.app](https://keycraft-store.vercel.app) *(Deploy link configured for Vercel)*
- **Repository:** [https://github.com/shadmehress-hub/keycraft-store](https://github.com/shadmehress-hub/keycraft-store)

---

## 🏗️ Architecture & Data Flow

```mermaid
flowchart TD
    Client["Client Browser (RTL / Vazirmatn)"]
    
    subgraph Frontend["Next.js 16 App Router (React 19)"]
        RSC["React Server Components (Streaming SSR)"]
        RCC["React Client Components (Zustand & Interactivity)"]
        Cart["Zustand Cart Store (LocalStorage Persist)"]
        Skeletons["Streaming Skeletons (loading.tsx - 0 CLS)"]
    end
    
    subgraph Backend["Server Actions & Data Layer"]
        Action["Server Action: createOrder()"]
        Verify["Price & Stock Verification (Anti-Tamper)"]
        Tx["Prisma Atomic Transaction ($transaction)"]
    end
    
    subgraph Database["PostgreSQL (Prisma 7)"]
        DB[("PostgreSQL Database")]
        Products["Product Catalog (16 items)"]
        Orders["Orders & OrderItems"]
    end

    Client -->|Browse & Search| RSC
    RSC -->|Stream Skeletons| Skeletons
    Client -->|Add to Cart| Cart
    Cart -->|Hydrate UI| RCC
    Client -->|Submit Order| Action
    Action -->|Verify against DB| Verify
    Verify -->|Run Atomic Tx| Tx
    Tx -->|Write Orders & Decrement Stock| DB
    DB -->|Fetch Catalog| RSC
```

---

## ✨ Key Features & Engineering Highlights

### 1. URL-Driven Search, Category Filter & Sorting
- **Debounced Search:** 300ms debounce implemented using `useRef` + `setTimeout` to prevent database query flooding on keystrokes.
- **URL Synchronization:** Built with Next.js `useSearchParams`, `usePathname`, and `useRouter` (`{ scroll: false }`) ensuring search queries and category filters are 100% shareable and browser history friendly.
- **PPR & Suspense Guardrails:** All search and filter components are isolated within React `<Suspense>` boundaries to satisfy Next.js 16 Partial Prerendering requirements.

### 2. High-Performance State Management (Zustand v5)
- **Immutable Cart Store:** Strict immutable array updates for adding items, incrementing quantity, and auto-deleting items when quantity reaches 0.
- **Stock Capping:** Automatically caps order quantity to available warehouse stock (`Math.min(quantity, product.stock)`).
- **Zero Hydration Mismatch:** Protected against SSR hydration errors through mounted lifecycle guards.

### 3. Secure Server Action Checkout Flow
- **Anti-Tamper Security:** Client-supplied prices and totals are never trusted. The Server Action (`createOrder`) queries PostgreSQL to verify actual product prices and confirm inventory before purchase.
- **Atomic Database Transactions:** Uses `prisma.$transaction` to simultaneously create the order record, save item snapshots, and decrement product inventory in a single atomic database operation.
- **Unique Tracking Code:** Automatically issues human-readable tracking identifiers (e.g. `KC-849201`) with a dedicated invoice receipt view.

### 4. Zero Layout Shift (CLS = 0) & Streaming UX
- **Skeleton Shimmer Screens:** Replaces generic text loaders with custom layout-matching skeleton screens for product catalogs and detail pages.
- **Responsive Next.js Image Optimization:** Configured with strict aspect ratio containers (`aspect-[4/3]`) and explicit `sizes` attributes, serving next-gen WebP formats tailored to mobile, tablet, and 4K viewports.

### 5. Production SEO & OpenGraph Engine
- **Dynamic Product Metadata:** Dynamic `generateMetadata()` generating customized social preview cards (OpenGraph & Twitter Cards) for every single product.
- **JSON-LD Structured Data:** Injected `schema.org/Product` rich snippet data to expose pricing, availability, and merchant metadata directly to Google crawlers.
- **Automated Sitemap & Robots:** Fully dynamic `sitemap.ts` querying live database slugs and `robots.ts` protecting customer invoice routes.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | [Next.js 16.4.3](https://nextjs.org/) | App Router, Turbopack, Partial Prerendering, Server Actions |
| **Library** | [React 19.3.0](https://react.dev/) | React Server Components, `useTransition`, concurrent streaming |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | CSS-first configuration via `@theme inline` |
| **Icons & UI** | [shadcn/ui](https://ui.shadcn.com/) + [Lucide](https://lucide.dev/) | Radix UI primitives, accessible icons |
| **State** | [Zustand 5.1](https://zustand.docs.pmnd.rs/) | Lightweight global state with LocalStorage persistence |
| **Database ORM** | [Prisma 7.10](https://www.prisma.io/) | Schema definition, TypeScript client, connection pooling |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Relational database with UUID keys & foreign constraints |
| **Testing** | [Vitest 5.1](https://vitest.dev/) | High-speed unit & integration test runner |
| **Package Manager**| [pnpm](https://pnpm.io/) | Fast, disk space efficient package manager |

---

## 🧪 Automated Testing

KeyCraft Studio includes a comprehensive unit testing suite powered by **Vitest**:

```bash
$ pnpm test

 ✓ src/modules/cart/store/__tests__/useCartStore.test.ts (9 tests)
 ✓ src/modules/checkout/actions/__tests__/createOrder.test.ts (4 tests)

 Test Files  2 passed (2)
      Tests  13 passed (13)
   Duration  ~300ms
```

### Covered Test Scenarios:
1. Initial empty state verification.
2. Adding new products to the cart.
3. Quantity incrementing on duplicate additions.
4. **Stock capping protection** (preventing orders exceeding available stock).
5. Direct quantity updates and auto-deletion on zero quantity.
6. Multi-item cart price and item count mathematical calculations.
7. Cart wipe upon checkout completion.
8. Server action validation (name length, Iranian phone regex, address requirements, empty cart protection).

---

## 📂 Project Directory Structure

```
keycraft-store/
├── prisma/
│   ├── schema.prisma           # Prisma 7 Database Schema (Product, Order, OrderItem)
│   └── seed.mjs                # Database seeder (16 products with custom photography)
├── public/
│   ├── icon.svg                # Custom KeyCraft Artisan Keycap Favicon
│   └── products/               # High-resolution product showcase photography
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root Layout (Theme, Fonts, Header, CartBadge)
│   │   ├── page.tsx            # Landing Showcase & Hero Carousel
│   │   ├── robots.ts           # Dynamic Robots.txt configuration
│   │   ├── sitemap.ts          # Dynamic Sitemap generator querying PostgreSQL
│   │   ├── cart/page.tsx       # Interactive Shopping Cart Page
│   │   ├── checkout/           # Checkout flow with shipping forms
│   │   │   └── success/[id]/   # Invoice receipt page with tracking code
│   │   └── products/
│   │       ├── page.tsx        # Filterable & searchable product grid
│   │       └── [id]/           # Product details, gallery & specs
│   ├── components/             # Shared layout components (Header, ThemeToggle, Banner)
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client singleton with pg pool adapter
│   │   └── utils.ts            # ClassName merging utilities (cn)
│   └── modules/
│       ├── cart/               # Zustand store, actions, and unit tests
│       ├── checkout/           # Server actions, validation, and types
│       └── products/           # Product cards, filters, search, and skeletons
├── vitest.config.ts            # Vitest runner configuration with path aliases
└── vitest.setup.ts             # Node.js environment storage mocks
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- pnpm installed (`corepack enable` or `npm i -g pnpm`)
- PostgreSQL database instance

### 1. Clone the Repository
```bash
git clone https://github.com/shadmehress-hub/keycraft-store.git
cd keycraft-store
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### 4. Push Schema & Seed Database
```bash
pnpm db:push
pnpm db:generate
pnpm node prisma/seed.mjs
```

### 5. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Run Automated Tests
```bash
pnpm test        # Single test run
pnpm test:watch  # Interactive watch mode
```

---

## ☁️ Deployment on Vercel

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Import the project in [Vercel](https://vercel.com/new).
3. Set the Environment Variable:
   - `DATABASE_URL`: Your production PostgreSQL connection string.
4. Click **Deploy**. Vercel will build and launch your application globally on Edge/Serverless infrastructure.

---

## 👨‍💻 Author

**KeyCraft Studio Team**
- GitHub: [@shadmehress-hub](https://github.com/shadmehress-hub)
- Crafted for Mechanical Keyboard Enthusiasts worldwide.
