"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  // بستن مودال با فشردن کلید Esc
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-2 backdrop-blur-sm sm:p-5">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="بستن گالری تصاویر"
        className="absolute inset-0 size-full cursor-default"
      />

      {/* کادر اصلی مودال */}
      <section
        role="dialog"
        aria-modal="true"
        aria-label="گالری تصاویر محصول"
        className="border-border bg-background relative z-10 max-h-[calc(100dvh-1rem)] w-full max-w-5xl overflow-x-hidden overflow-y-auto overscroll-contain rounded-2xl border shadow-2xl sm:max-h-[min(88dvh,52rem)] sm:rounded-3xl dark:border-white/10 dark:bg-zinc-950/95"
      >
        {/* دکمه ضربدر برای بستن */}
        <button
          onClick={() => router.back()}
          aria-label="بستن گالری"
          className="absolute top-3 left-3 z-20 flex size-10 items-center justify-center rounded-full border border-black/5 bg-white/90 text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:bg-rose-500 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none sm:top-4 sm:left-4 dark:border-white/10 dark:bg-zinc-900/90 dark:text-white/80"
        >
          <X className="size-4.5" />
        </button>

        {/* محتوای فرزند (که در اینجا CatalogGallery خواهد بود) */}
        {children}
      </section>
    </div>
  );
}
