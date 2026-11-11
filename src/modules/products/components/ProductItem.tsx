"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import { Check, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/modules/cart/store/useCartStore";
import type { Product as PrismaProduct } from "@prisma/client";
import type { Product as MockProduct } from "../mock/products";

export type ProductItemData =
  | MockProduct
  | PrismaProduct
  | (Omit<PrismaProduct, "createdAt" | "updatedAt"> & { image?: string });

const categoryLabels: Record<string, string> = {
  KEYBOARDS: "کیبورد مکانیکی",
  SWITCHES: "سوییچ و مادینگ",
  KEYCAPS: "کیپ‌کپ و لوازم جانبی",
  ACCESSORIES: "اکسسوری ستاپ",
};

const ProductItem = ({ product }: { product: ProductItemData }) => {
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const imageSrc =
    ("coverImage" in product && product.coverImage) ||
    ("image" in product && (product as MockProduct).image) ||
    "/products/lumina.jpg";

  const rawCategory = String(product.category);
  const displayCategory = categoryLabels[rawCategory] || rawCategory;
  const productId = ("slug" in product && product.slug) || product.id;
  const maxStock =
    "stock" in product && typeof product.stock === "number" ? product.stock : 10;
  const isInStock = product.inStock !== false && maxStock > 0;

  const handleQuickAdd = () => {
    if (!isInStock) return;

    addItem({
      id: product.id,
      slug: productId,
      name: product.name,
      price: product.price,
      coverImage: imageSrc,
      stock: maxStock,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card/80 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/30 hover:shadow-[0_12px_40px_-16px_rgba(120,78,34,0.25)] dark:bg-white/[0.02] dark:hover:border-amber-400/30 dark:hover:bg-white/[0.04] dark:hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.15)]">
      <CardHeader className="p-0">
        <Link
          href={`/products/${productId}`}
          className="relative aspect-[16/11] w-full overflow-hidden bg-stone-200 sm:aspect-[4/3] dark:bg-zinc-950 block"
          suppressHydrationWarning
        >
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {!isInStock && (
            <span className="absolute right-3 bottom-3 rounded-full border border-rose-300/20 bg-rose-950/75 px-2.5 py-1 text-[10px] font-medium text-rose-200 backdrop-blur-md sm:right-4 sm:bottom-4 sm:text-xs">
              ناموجود
            </span>
          )}
        </Link>
      </CardHeader>

      <CardContent className="flex grow flex-col p-4 sm:p-5">
        <span className="text-[10px] font-semibold tracking-wider text-amber-800 sm:text-xs dark:text-amber-400">
          {displayCategory}
        </span>
        <h2 className="mt-1.5 line-clamp-2 text-sm leading-tight font-bold text-foreground transition-colors group-hover:text-amber-800 sm:mt-2 sm:text-base dark:text-zinc-100 dark:group-hover:text-amber-300">
          <Link href={`/products/${productId}`}>{product.name}</Link>
        </h2>
        <p
          suppressHydrationWarning
          className="mt-auto pt-3 text-sm font-bold tracking-wide text-foreground sm:pt-4 sm:text-base dark:text-zinc-300"
        >
          {product.price.toLocaleString("fa-IR")}{" "}
          <span className="text-[10px] font-normal text-muted-foreground sm:text-xs">
            تومان
          </span>
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="h-10 flex-1 rounded-xl border-amber-700/15 bg-amber-500/[0.06] text-xs font-semibold text-amber-900 transition-colors hover:border-amber-600/35 hover:bg-amber-500/10 hover:text-amber-950 focus-visible:ring-amber-500/50 sm:text-sm dark:border-amber-300/15 dark:bg-amber-300/[0.06] dark:text-amber-200 dark:hover:border-amber-300/30 dark:hover:bg-amber-300/10 dark:hover:text-amber-100"
          >
            <Link href={`/products/${productId}`}>مشاهده مشخصات فنی</Link>
          </Button>

          {isInStock && (
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={`افزودن سریع ${product.name} به سبد خرید`}
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all active:scale-90 ${
                justAdded
                  ? "border-emerald-500/30 bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "border-amber-400/30 bg-amber-400 text-zinc-950 shadow-sm shadow-amber-400/20 hover:bg-amber-300"
              }`}
            >
              {justAdded ? (
                <Check className="size-4.5 stroke-[2.5]" />
              ) : (
                <ShoppingBag className="size-4.5" />
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
