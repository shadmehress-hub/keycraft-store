import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { GalleryThumbnails, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../mock/products";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card className="group border-border bg-card/80 text-card-foreground relative flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/30 hover:shadow-[0_12px_40px_-16px_rgba(120,78,34,0.25)] dark:bg-white/[0.02] dark:hover:border-amber-400/30 dark:hover:bg-white/[0.04] dark:hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.15)]">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-stone-200 sm:aspect-[4/3] dark:bg-zinc-950">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          <button
            type="button"
            aria-label="افزودن به علاقه‌مندی‌ها"
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 backdrop-blur-md transition-all hover:scale-110 hover:border-amber-400/50 hover:bg-black/80 hover:text-amber-400 sm:top-4 sm:right-4 sm:size-9"
          >
            <Heart className="size-4 sm:size-4.5" />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full border border-white/10 text-[10px] font-medium text-zinc-300 backdrop-blur-md sm:bottom-4 sm:left-4 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
            {/* بج گالری تبدیل‌شده به لینک */}
            <Link
              href={`/products/catalog?id=${product.id}`}
              aria-label={`مشاهده گالری تصاویر ${product.name}`}
              className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-medium text-zinc-300 backdrop-blur-md transition-all hover:scale-105 hover:border-amber-400/50 hover:bg-black/85 hover:text-amber-300 sm:bottom-4 sm:left-4 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
            >
              <GalleryThumbnails className="size-3 text-amber-400 sm:size-3.5" />
              <span dir="ltr">{product?.images?.length || 1}</span>
            </Link>
          </div>
          {!product.inStock && (
            <span className="absolute right-3 bottom-3 rounded-full border border-rose-300/20 bg-rose-950/75 px-2.5 py-1 text-[10px] font-medium text-rose-200 backdrop-blur-md sm:right-4 sm:bottom-4 sm:text-xs">
              ناموجود
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex grow flex-col p-4 sm:p-5">
        <span className="text-[10px] font-semibold tracking-wider text-amber-800 sm:text-xs dark:text-amber-400">
          {product?.category}
        </span>
        <h2 className="text-foreground mt-1.5 line-clamp-2 text-sm leading-tight font-bold transition-colors group-hover:text-amber-800 sm:mt-2 sm:text-base dark:text-zinc-100 dark:group-hover:text-amber-300">
          {product?.name}
        </h2>
        <p className="text-foreground mt-auto pt-3 text-sm font-bold tracking-wide sm:pt-4 sm:text-base dark:text-zinc-300">
          {product.price.toLocaleString("fa-IR")}{" "}
          <span className="text-muted-foreground text-[10px] font-normal sm:text-xs">
            تومان
          </span>
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-4 h-10 w-full rounded-xl border-amber-700/15 bg-amber-500/[0.06] text-sm font-semibold text-amber-900 transition-colors hover:border-amber-600/35 hover:bg-amber-500/10 hover:text-amber-950 focus-visible:ring-amber-500/50 dark:border-amber-300/15 dark:bg-amber-300/[0.06] dark:text-amber-200 dark:hover:border-amber-300/30 dark:hover:bg-amber-300/10 dark:hover:text-amber-100"
        >
          <Link href={`/products/${product?.id}`}>مشاهده مشخصات فنی</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
