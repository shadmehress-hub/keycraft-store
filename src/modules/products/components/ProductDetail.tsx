import { ArrowRight, Check, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import type { Product } from "../mock/products";

function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8">
      <nav
        aria-label="مسیر صفحه"
        className="text-muted-foreground mb-6 flex items-center gap-2 text-sm"
      >
        <Link
          href="/products"
          className="transition-colors hover:text-amber-700 dark:hover:text-amber-300"
        >
          محصولات
        </Link>
        <ArrowRight className="size-3.5" aria-hidden="true" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="border-border relative aspect-[4/3] overflow-hidden rounded-3xl border bg-stone-200 shadow-2xl shadow-stone-900/10 dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        </div>

        <section className="flex flex-col lg:py-6">
          <span className="w-fit rounded-full border border-amber-600/20 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200">
            {product.category}
          </span>
          <h1 className="text-foreground mt-4 text-2xl leading-relaxed font-bold tracking-tight sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-5 text-2xl font-bold text-amber-800 sm:text-3xl dark:text-amber-300">
            {product.price.toLocaleString("fa-IR")}
            <span className="text-muted-foreground mr-2 text-sm font-medium">
              تومان
            </span>
          </p>

          <div className="bg-border my-6 h-px w-full" />

          <h2 className="text-foreground text-sm font-semibold">
            دربارهٔ محصول
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-7 sm:text-base sm:leading-8">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm">
            {product.inStock ? (
              <>
                <Check
                  className="size-4 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span className="text-emerald-800 dark:text-emerald-300">
                  موجود در فروشگاه
                </span>
              </>
            ) : (
              <>
                <Package
                  className="size-4 text-rose-600 dark:text-rose-300"
                  aria-hidden="true"
                />
                <span className="text-rose-800 dark:text-rose-200">
                  در حال حاضر ناموجود
                </span>
              </>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-xl px-6">
              <Link href="/products">بازگشت به محصولات</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border bg-card text-foreground hover:bg-muted h-11 rounded-xl px-6"
            >
              <Link href="/">صفحهٔ اصلی</Link>
            </Button>
          </div>

          <p className="text-muted-foreground mt-6 text-xs">
            شناسهٔ محصول:{" "}
            <span dir="ltr" className="font-mono">
              {product.id}
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
