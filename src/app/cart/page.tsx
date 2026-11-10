import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function CartPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="border-border bg-card flex size-16 items-center justify-center rounded-2xl border text-amber-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-amber-300">
        <ShoppingBag className="size-7" aria-hidden="true" />
      </div>
      <h1 className="text-foreground mt-6 text-2xl font-bold sm:text-3xl">
        سبد خریدت خالی است
      </h1>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-7 sm:text-base">
        هنوز محصولی انتخاب نکرده‌ای. از محصولات فروشگاه دیدن کن و گزینهٔ مناسب
        خودت را پیدا کن.
      </p>
      <Button asChild className="mt-7 h-11 rounded-xl px-6">
        <Link href="/products">رفتن به فروشگاه</Link>
      </Button>
    </main>
  );
}
