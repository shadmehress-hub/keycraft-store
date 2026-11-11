"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useCartStore } from "@/modules/cart/store/useCartStore";
import type { Product as MockProduct } from "../mock/products";
import type { Product as PrismaProduct } from "@prisma/client";

export type ProductDetailData =
  | MockProduct
  | PrismaProduct
  | (Omit<PrismaProduct, "createdAt" | "updatedAt"> & { image?: string });

const categoryLabels: Record<string, string> = {
  KEYBOARDS: "کیبورد مکانیکی",
  SWITCHES: "سوییچ و مادینگ",
  KEYCAPS: "کیپ‌کپ و لوازم جانبی",
  ACCESSORIES: "اکسسوری ستاپ",
};

function ProductDetail({ product }: { product: ProductDetailData }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Gereftane action-e addItem az Zustand Store
  const addItem = useCartStore((state) => state.addItem);

  const imageSrc =
    ("coverImage" in product && product.coverImage) ||
    ("image" in product && (product as MockProduct).image) ||
    "/products/lumina.jpg";

  const allImages =
    ("images" in product && Array.isArray(product.images) && product.images.length > 0)
      ? product.images
      : [imageSrc];

  const [activeImage, setActiveImage] = useState(allImages[0] || imageSrc);

  const rawCategory = String(product.category);
  const displayCategory = categoryLabels[rawCategory] || rawCategory;
  const productId = ("slug" in product && product.slug) || product.id;
  const maxStock =
    "stock" in product && typeof product.stock === "number" ? product.stock : 10;
  const isInStock = product.inStock !== false && maxStock > 0;

  const handleAddToCart = () => {
    if (!isInStock) return;

    addItem(
      {
        id: product.id,
        slug: productId,
        name: product.name,
        price: product.price,
        coverImage: activeImage,
        stock: maxStock,
      },
      quantity
    );

    // Feedback-e visual be karbar baraye 2 sanie
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const increment = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8">
      {/* Breadcrumb navigation */}
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
        <ArrowLeft className="size-3.5 text-muted-foreground/60" aria-hidden="true" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image Section */}
        <div className="flex flex-col gap-3.5">
          <div
            suppressHydrationWarning
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-stone-200 shadow-2xl shadow-stone-900/10 dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/20"
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover transition-all duration-300"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          </div>

          {/* Thumbnail Gallery Strip (faghat agar bishtar az 1 ax bashe) */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  aria-label={`نمایش تصویر ${idx + 1}`}
                  className={`relative aspect-square size-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImage === img
                      ? "border-amber-400 shadow-sm shadow-amber-400/20"
                      : "border-border/60 opacity-60 hover:opacity-100 dark:border-white/10"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <section className="flex flex-col lg:py-4">
          <span className="w-fit rounded-full border border-amber-600/20 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200">
            {displayCategory}
          </span>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {product.name}
          </h1>

          <p
            suppressHydrationWarning
            className="mt-5 text-2xl font-bold text-amber-800 sm:text-3xl dark:text-amber-300"
          >
            {product.price.toLocaleString("fa-IR")}{" "}
            <span className="mr-1 text-sm font-medium text-muted-foreground">
              تومان
            </span>
          </p>

          <div className="my-6 h-px w-full bg-border" />

          <h2 className="text-sm font-semibold text-foreground">
            دربارهٔ محصول
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="mt-6 flex items-center gap-2 text-sm">
            {isInStock ? (
              <>
                <Check
                  className="size-4 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span className="text-emerald-800 dark:text-emerald-300">
                  موجود در انبار ({maxStock.toLocaleString("fa-IR")} عدد)
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

          {/* Interactive Cart Section */}
          {isInStock && (
            <div className="mt-7 flex flex-col gap-3">
              {/* Row 1: Quantity selector + Add to Cart Button (Side-by-side rooye mobile va desktop) */}
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                {/* Quantity selector ba dir="ltr" baraye layout-e standard-e [- 1 +] */}
                <div
                  dir="ltr"
                  className="flex h-12 w-28 shrink-0 items-center justify-between rounded-xl border border-border bg-card/90 px-2 shadow-xs sm:w-34 sm:px-3 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <button
                    type="button"
                    onClick={decrement}
                    disabled={quantity <= 1}
                    aria-label="کاهش تعداد"
                    className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-25 disabled:hover:bg-transparent"
                  >
                    <Minus className="size-3.5" />
                  </button>

                  <span className="font-english text-sm font-bold text-foreground sm:text-base">
                    {quantity.toLocaleString("fa-IR")}
                  </span>

                  <button
                    type="button"
                    onClick={increment}
                    disabled={quantity >= maxStock}
                    aria-label="افزایش تعداد"
                    className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-25 disabled:hover:bg-transparent"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-12 flex-1 rounded-xl bg-amber-400 font-bold text-zinc-950 shadow-md shadow-amber-400/20 transition-all hover:bg-amber-300 active:scale-[0.98]"
                >
                  {isAdded ? (
                    <span className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-950 sm:text-sm animate-in fade-in zoom-in-75 duration-150">
                      <CheckCircle2 className="size-4.5 text-emerald-700" />
                      به سبد افزوده شد!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5 text-xs font-bold sm:text-sm">
                      <ShoppingBag className="size-4" />
                      افزودن به سبد خرید
                    </span>
                  )}
                </Button>
              </div>

              {/* Row 2: Secondary action links (Side-by-side rooye mobile va desktop) */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-10 flex-1 rounded-xl border-border bg-card/50 text-xs font-medium text-foreground transition-colors hover:border-amber-500/40 hover:bg-card sm:text-sm dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <Link href="/products" className="flex items-center justify-center gap-1.5">
                    <ArrowLeft className="size-3.5 text-muted-foreground" />
                    بازگشت به محصولات
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-10 flex-1 rounded-xl border-border bg-card/50 text-xs font-medium text-muted-foreground transition-colors hover:border-amber-500/40 hover:bg-card hover:text-foreground sm:text-sm dark:border-white/10 dark:bg-white/[0.02]"
                >
                  <Link href="/cart" className="flex items-center justify-center gap-1.5">
                    <ShoppingBag className="size-3.5 text-amber-500" />
                    مشاهده سبد خرید
                  </Link>
                </Button>
              </div>
            </div>
          )}

          <p className="mt-6 text-xs text-muted-foreground">
            شناسهٔ محصول:{" "}
            <span dir="ltr" className="font-mono">
              {productId}
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default ProductDetail;
