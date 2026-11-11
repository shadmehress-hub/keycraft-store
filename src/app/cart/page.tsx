"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useCartStore } from "@/modules/cart/store/useCartStore";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Jologiri az Hydration Mismatch: ta zamani ke client mount nashode,
  // yek skeleton-e sabok ya loading-e sade neshun midim.
  if (!mounted) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="size-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">در حال بارگذاری سبد خرید...</p>
      </main>
    );
  }

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Halate Sabade Khali
  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 animate-in fade-in-50 duration-300">
        <div className="flex size-18 items-center justify-center rounded-2xl border border-border bg-card text-amber-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-amber-300">
          <ShoppingBag className="size-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
          سبد خریدت خالی است
        </h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          هنوز محصولی انتخاب نکرده‌ای. از محصولات تخصصی KeyCraft دیدن کن و گزینهٔ مناسب خودت را پیدا کن.
        </p>
        <Button asChild className="mt-7 h-11 rounded-xl bg-amber-400 px-6 font-semibold text-zinc-950 shadow-md shadow-amber-400/20 hover:bg-amber-300">
          <Link href="/products" className="flex items-center gap-2">
            رفتن به فروشگاه
            <ArrowLeft className="size-4 rtl:rotate-0" />
          </Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-20 sm:px-6 lg:px-8 animate-in fade-in-50 duration-300">
      <header className="mb-8 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            سبد خرید شما
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalItems.toLocaleString("fa-IR")} قلم کالا در انتظار تکمیل سفارش
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="flex w-fit items-center gap-1.5 text-xs text-rose-500 transition hover:text-rose-400 hover:underline"
        >
          <Trash2 className="size-3.5" />
          خالی کردن کل سبد
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Cart Items List (8 Columns) */}
        <div className="space-y-4 lg:col-span-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-4 shadow-sm transition-all sm:flex-row sm:items-center sm:gap-6 sm:p-5 dark:border-white/10 dark:bg-white/[0.02]"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-square size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-stone-200 sm:size-24 dark:border-white/10 dark:bg-zinc-950">
                <Image
                  src={item.coverImage}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title & Info */}
              <div className="flex flex-1 flex-col justify-center">
                <Link
                  href={`/products/${item.slug || item.id}`}
                  className="line-clamp-2 text-sm font-bold text-foreground transition hover:text-amber-700 sm:text-base dark:hover:text-amber-300"
                >
                  {item.name}
                </Link>

                <p className="mt-2 text-xs font-bold text-amber-800 sm:text-sm dark:text-amber-300">
                  {item.price.toLocaleString("fa-IR")}{" "}
                  <span className="text-[10px] font-normal text-muted-foreground sm:text-xs">
                    تومان
                  </span>
                </p>
              </div>

              {/* Quantity Controls & Actions */}
              <div className="flex items-center justify-between border-t border-border/60 pt-3 sm:border-t-0 sm:pt-0 sm:gap-6">
                <div className="flex h-9 w-28 items-center justify-between rounded-lg border border-border bg-card px-2 dark:border-white/10 dark:bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="کاهش تعداد"
                    className="flex size-6 items-center justify-center rounded text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    <Minus className="size-3" />
                  </button>

                  <span dir="ltr" className="text-xs font-bold text-foreground sm:text-sm">
                    {item.quantity.toLocaleString("fa-IR")}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label="افزایش تعداد"
                    className="flex size-6 items-center justify-center rounded text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-30"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>

                {/* Subtotal of item */}
                <span className="text-xs font-bold text-foreground sm:text-sm">
                  {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                </span>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`حذف ${item.name}`}
                  className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-rose-500/10 hover:text-rose-500"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card (4 Columns) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl border border-border bg-card/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-base font-bold text-foreground">خلاصه سفارش</h2>

            <div className="mt-5 space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>قیمت کالاها ({totalItems.toLocaleString("fa-IR")})</span>
                <span className="font-semibold text-foreground">
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>هزینه ارسال</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  رایگان
                </span>
              </div>

              <div className="my-4 h-px w-full bg-border" />

              <div className="flex justify-between text-sm font-bold text-foreground sm:text-base">
                <span>مبلغ نهایی پرداخت</span>
                <span className="text-amber-800 dark:text-amber-300">
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            <Button
              asChild
              className="mt-6 h-12 w-full rounded-xl bg-amber-400 font-semibold text-zinc-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300 active:scale-[0.98]"
            >
              <Link href="/checkout">
                ثبت نهایی و پرداخت
              </Link>
            </Button>

            {/* Trust Badges */}
            <div className="mt-6 space-y-2.5 border-t border-border pt-4 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 text-amber-500" />
                <span>ارسال رایگان برای تمام سفارش‌های KeyCraft</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>ضمانت اصالت و سلامت فیزیکی قطعات</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
