import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Category, Prisma } from "@prisma/client";
import ProductList from "@/modules/products/components/ProductList";
import ProductListSkeleton from "@/modules/products/components/ProductListSkeleton";
import ProductSearch from "@/modules/products/components/ProductSearch";
import ProductFilters from "@/modules/products/components/ProductFilters";

interface PageProps {
  // Next.js 16 Guardrail: searchParams yek Promise hast
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
  }>;
}

const CATEGORY_MAP: Record<string, string> = {
  KEYBOARDS: "کیبوردهای مکانیکال",
  SWITCHES: "سوییچ‌ها",
  KEYCAPS: "کیپ‌کپ و آرتیران",
  ACCESSORIES: "لوازم جانبی و ستاپ",
};

/**
 * ProductListContent - Async Server Component
 * searchParams dakhele Suspense await mishe ta az Blocking Route jologiri beshe.
 */
async function ProductListContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q, category, sort } = await searchParams;

  const where: Prisma.ProductWhereInput = {};

  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  const validCategory =
    category && Object.values(Category).includes(category as Category)
      ? (category as Category)
      : undefined;

  if (validCategory) {
    where.category = validCategory;
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
  });

  return (
    <>
      {(q || validCategory) && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground animate-in fade-in-50 duration-200">
          <div className="flex flex-wrap items-center gap-2">
            {validCategory && (
              <span className="rounded-lg bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-500 dark:text-amber-300">
                دسته: {CATEGORY_MAP[validCategory]}
              </span>
            )}
            {q && (
              <span>
                جستجو برای: <strong className="text-foreground">«{q}»</strong>
              </span>
            )}
          </div>

          <span className="text-xs text-muted-foreground">
            {products.length} محصول پیدا شد
          </span>
        </div>
      )}

      <ProductList
        products={products}
        emptyMessage={
          q || validCategory
            ? "هیچ محصولی با مشخصات انتخابی یافت نشد. فیلترها را تغییر دهید یا حذف کنید."
            : undefined
        }
      />
    </>
  );
}

export default function ProductsPage({ searchParams }: PageProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8">
      <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:pb-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
              انتخاب KeyCraft
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              محصولات کیبورد و میز کار
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              از کیبورد مکانیکال تا قطعات و جزئیاتی که ستاپت را کامل می‌کنند.
            </p>
          </div>

          {/* Search Box inside Suspense (chon az useSearchParams estefade mikone) */}
          <div className="w-full md:w-80 lg:w-96">
            <Suspense
              fallback={
                <div className="h-11 w-full animate-pulse rounded-xl border border-border bg-card/50 dark:border-white/10 dark:bg-white/[0.03]" />
              }
            >
              <ProductSearch />
            </Suspense>
          </div>
        </div>
      </header>

      {/* Category Pills & Sort Controls inside Suspense */}
      <Suspense
        fallback={
          <div className="mb-8 h-12 w-full animate-pulse rounded-xl border border-border bg-card/30 dark:border-white/5" />
        }
      >
        <ProductFilters />
      </Suspense>

      {/* Dynamic Products Grid inside Suspense */}
      <Suspense fallback={<ProductListSkeleton count={8} />}>
        <ProductListContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
