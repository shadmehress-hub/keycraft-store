"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ArrowUpDown, RotateCcw } from "lucide-react";

const CATEGORIES = [
  { id: "ALL", label: "همه محصولات" },
  { id: "KEYBOARDS", label: "کیبوردهای مکانیکال" },
  { id: "SWITCHES", label: "سوییچ‌ها" },
  { id: "KEYCAPS", label: "کیپ‌کپ و آرتیران" },
  { id: "ACCESSORIES", label: "لوازم جانبی و ستاپ" },
] as const;

const SORT_OPTIONS = [
  { id: "newest", label: "جدیدترین" },
  { id: "price-asc", label: "ارزان‌ترین" },
  { id: "price-desc", label: "گران‌ترین" },
] as const;

export default function ProductFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentCategory = searchParams.get("category") ?? "ALL";
  const currentSort = searchParams.get("sort") ?? "newest";
  const hasActiveFilters = Boolean(
    searchParams.get("category") ||
      searchParams.get("sort") ||
      searchParams.get("q")
  );

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url, { scroll: false });
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === "ALL") {
      updateParam("category", null);
    } else {
      updateParam("category", categoryId);
    }
  };

  const handleSortChange = (sortId: string) => {
    if (sortId === "newest") {
      updateParam("sort", null);
    } else {
      updateParam("sort", sortId);
    }
  };

  const handleReset = () => {
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:mb-10 sm:pb-8">
      {/* Category Pills & Reset button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Horizontal Category Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-sm scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                  isActive
                    ? "bg-amber-400 text-zinc-950 shadow-sm shadow-amber-400/20"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground dark:border-white/10 dark:bg-white/[0.02]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort Controls & Reset */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/60 p-1 text-xs dark:border-white/10 dark:bg-white/[0.02] sm:text-sm">
            <span className="flex items-center gap-1 px-2 text-muted-foreground">
              <ArrowUpDown className="size-3.5" />
              <span className="hidden sm:inline">مرتب‌سازی:</span>
            </span>

            {SORT_OPTIONS.map((opt) => {
              const isSelected = currentSort === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSortChange(opt.id)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? "bg-amber-400/15 text-amber-500 font-semibold dark:bg-amber-400/20 dark:text-amber-300"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-dashed border-red-500/40 bg-red-500/5 px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10 dark:text-red-400"
            >
              <RotateCcw className="size-3" />
              <span>حذف فیلترها</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
