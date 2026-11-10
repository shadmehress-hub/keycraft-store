# AGENTS.md — KeyCraft Studio Guidelines

## 1. Project Overview

**KeyCraft Studio** is a modern Persian (RTL) e-commerce web application specializing in custom mechanical keyboards, switches, artisan/PBT keycaps, and minimalist desk setup accessories.

## 2. Tech Stack & Tooling

- **Framework:** Next.js 16.4+ (App Router, Turbopack)
- **Library:** React 19
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first configuration via `@theme inline` in `src/app/globals.css`)
- **UI Components:** `shadcn/ui` (Radix UI primitives) + `lucide-react` icons
- **Package Manager:** `pnpm` ONLY (Never use `npm` or `yarn`)
- **Quality Control:** ESLint, Prettier, and Husky pre-commit hooks

## 3. Next.js 16 & React 19 Guardrails (CRITICAL)

- **Async Dynamic APIs:** `params` and `searchParams` in Pages/Layouts are Promises in Next.js 16. Always type them as `Promise<{ ... }>` and `await` them before accessing properties.
- **Prerendering & Static Safety:** Do NOT call unstable dynamic functions like `new Date()` or `Math.random()` directly inside static Server Components or `RootLayout` (`src/app/layout.tsx`) without explicit caching or client boundaries, as Next.js 16 throws a `Blocking Route` error.
- **Server-First Architecture:** Default to React Server Components (RSC). Only add `"use client"` at the top of a file when using React hooks (`useState`, `useEffect`), browser listeners, or client-only libraries (e.g., Embla Carousel).
- **Hydration Safety:** Keep `suppressHydrationWarning` on `<html>` and `<body>` in `src/app/layout.tsx`.
- **Image Optimization:** Always use `next/image` with proper `sizes`, `alt`, and `fill` or explicit dimensions.

## 4. Directory Structure & Architecture

- `src/app/`: App Router pages and layouts.
  - Use **Private Folders** (`_components`, `_utils`, `_types`) inside specific route segments (e.g., `src/app/products/_components/`) for route-specific colocation.
  - Use **Route Groups** (`(shop)`, `(auth)`) when separating layouts without affecting the URL structure.
- `src/components/ui/`: Base `shadcn/ui` primitives.
  - Barrel exports are maintained in `src/components/ui/index.ts` (or `index.tsx`). Prefer importing UI primitives from `@/components/ui`.
- `src/components/`: Shared global components (`Header`, `Footer`, `Banner`, `Welcome`).
- **File Naming:** Match import casing strictly with the actual file name on disk to prevent Git/Linux build failures.

## 5. UI/UX, RTL Localization & Design System

- **Language & Direction:**
  - Primary document direction is RTL (`lang="fa" dir="rtl"`).
  - User-facing headings, descriptions, buttons, and prices must be in natural, modern Persian.
  - Technical badges, brand headers, product slugs, counters (e.g., `01 / 04`), and carousels must explicitly set `dir="ltr"`.
- **Typography:**
  - Persian text: `Vazirmatn` (`--font-vazirmatn`).
  - English text & badges: `Geist` (`--font-geist-sans`) and `Geist Mono` (`--font-geist-mono`).
- **Visual Aesthetic (Dark Enthusiast Theme):**
  - Background: Deep obsidian `#090b0e` with subtle top radial amber glow `bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.09),transparent_65%)]`.
  - Surfaces & Cards: Translucent dark surfaces (`bg-white/[0.02]` to `bg-white/[0.05]`, `bg-zinc-900/60`), subtle borders (`border-white/10`), and glassmorphism (`backdrop-blur-md`).
  - Accents: Warm Amber (`amber-300`, `amber-400`) for primary highlights, badges, and hover states; Zinc (`zinc-300`, `zinc-400`, `zinc-500`) for secondary typography.
  - Directional Icons: In RTL buttons/links, use `ArrowLeft` for forward progression or apply `rtl:rotate-180` where appropriate.

## 6. Coding Standards & Verification

- Write clean, modular, self-documenting TypeScript. Avoid `any`; define explicit `interface` or `type` contracts.
- Use `asChild` on `shadcn/ui` `<Button>` when wrapping `next/link` `<Link>`.
- Before finalizing changes, ensure imports are clean, unused variables are removed, and formatting complies with Prettier and ESLint (`pnpm lint`).
