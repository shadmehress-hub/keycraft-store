import { Card, CardContent, CardHeader, Skeleton } from "@/components/ui";

export function ProductCardSkeleton() {
  return (
    <Card className="relative flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
      <CardHeader className="p-0">
        <Skeleton className="aspect-[16/11] w-full rounded-none bg-stone-200 sm:aspect-[4/3] dark:bg-zinc-900/80" />
      </CardHeader>
      <CardContent className="flex grow flex-col p-4 sm:p-5">
        {/* Category badge */}
        <Skeleton className="h-3.5 w-24 rounded-full bg-amber-500/15 dark:bg-amber-400/15" />

        {/* Title placeholder (2 lines) */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-5/6 rounded-md dark:bg-zinc-800/90" />
          <Skeleton className="h-4 w-3/5 rounded-md dark:bg-zinc-800/90" />
        </div>

        {/* Price placeholder */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <Skeleton className="h-5 w-28 rounded-md dark:bg-zinc-800/90" />
          <Skeleton className="h-3.5 w-8 rounded-md dark:bg-zinc-800/60" />
        </div>

        {/* Button placeholder */}
        <Skeleton className="mt-4 h-10 w-full rounded-xl bg-amber-500/10 dark:bg-amber-300/[0.08]" />
      </CardContent>
    </Card>
  );
}

export function ProductListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      data-slot="product-list-skeleton"
      className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={`product-skeleton-${index}`} />
      ))}
    </div>
  );
}

export function ProductListViewSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8">
      <header className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
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
        <Skeleton className="h-5 w-16 rounded bg-muted/60 dark:bg-zinc-800/50" />
      </header>
      <ProductListSkeleton count={8} />
    </div>
  );
}

export default ProductListSkeleton;
