import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddsSlot() {
  return (
    <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-6 backdrop-blur-md dark:border-amber-400/20 dark:from-amber-400/10 dark:via-zinc-900/40 dark:to-zinc-950">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
        {/* متن و بج تبلیغات */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="flex items-center gap-1 rounded-full border border-amber-600/30 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 dark:text-amber-300">
              <Sparkles className="size-3" />
              پیشنهاد ویژه هفته
            </span>
            <span className="text-muted-foreground text-xs">اسلات موازی</span>
          </div>
          <h3 className="text-foreground text-base font-bold sm:text-lg">
            ۲۰٪ تخفیف روی پک سوییچ‌های خطی Gateron Oil King
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm">
            روان‌کاری کارخانه‌ای با متریال نایلونی برای ایجاد صدای بم و عمیق
          </p>
        </div>

        {/* دکمه اکشن */}
        <Link
          href="/products/gateron-oil-king"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-amber-400 px-5 text-xs font-bold text-zinc-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300"
        >
          مشاهده آفر
          <ArrowLeft className="size-4" />
        </Link>
      </div>
    </div>
  );
}
