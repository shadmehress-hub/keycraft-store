import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8 animate-in fade-in-50 duration-200">
      {/* Breadcrumb Skeleton */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-16 rounded-md dark:bg-zinc-800/80" />
        <span className="text-zinc-600 dark:text-zinc-700">/</span>
        <Skeleton className="h-4 w-36 rounded-md dark:bg-zinc-800/80" />
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image Skeleton */}
        <div className="flex flex-col gap-3.5">
          <Skeleton className="aspect-[4/3] w-full rounded-3xl bg-stone-200 dark:bg-zinc-900/90 shadow-2xl" />
        </div>

        {/* Product Info Skeleton */}
        <section className="flex flex-col lg:py-4">
          {/* Category Badge */}
          <Skeleton className="h-6 w-28 rounded-full bg-amber-500/15 dark:bg-amber-400/15" />

          {/* Title Placeholder */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-8 w-4/5 rounded-xl dark:bg-zinc-800/90" />
            <Skeleton className="h-8 w-2/5 rounded-xl dark:bg-zinc-800/70" />
          </div>

          {/* Price Placeholder */}
          <div className="mt-5 flex items-baseline gap-2">
            <Skeleton className="h-8 w-36 rounded-xl bg-amber-500/20 dark:bg-amber-400/20" />
            <Skeleton className="h-4 w-10 rounded-md dark:bg-zinc-800/60" />
          </div>

          <div className="my-6 h-px w-full bg-border" />

          {/* Description Title & Paragraphs */}
          <Skeleton className="h-4 w-24 rounded-md dark:bg-zinc-800/80" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-full rounded-md dark:bg-zinc-800/70" />
            <Skeleton className="h-4 w-11/12 rounded-md dark:bg-zinc-800/70" />
            <Skeleton className="h-4 w-3/4 rounded-md dark:bg-zinc-800/60" />
          </div>

          {/* Stock Indicator */}
          <div className="mt-6 flex items-center gap-2">
            <Skeleton className="size-4 rounded-full bg-emerald-500/20" />
            <Skeleton className="h-4 w-40 rounded-md dark:bg-zinc-800/70" />
          </div>

          {/* Buttons Row Skeleton */}
          <div className="mt-7 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <Skeleton className="h-12 w-28 shrink-0 rounded-xl sm:w-34 dark:bg-zinc-800/80" />
              <Skeleton className="h-12 flex-1 rounded-xl bg-amber-500/20 dark:bg-amber-400/20" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-10 flex-1 rounded-xl dark:bg-zinc-800/60" />
              <Skeleton className="h-10 flex-1 rounded-xl dark:bg-zinc-800/60" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
