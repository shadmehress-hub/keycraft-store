"use client";

import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Search, X } from "lucide-react";

export default function ProductSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const urlTerm = searchParams.get("q") ?? "";

  const [term, setTerm] = useState(urlTerm);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel the active debounce timer
  const clearDebounce = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Sync input with URL changes
  useEffect(() => {
    clearDebounce();

    setTerm((current) => (current.trim() === urlTerm ? current : urlTerm));
  }, [urlTerm]);

  // Update URL while preserving other query parameters
  const updateUrl = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const query = value.trim();

    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();

    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  };

  // Debounced input handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTerm(value);

    clearDebounce();

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      updateUrl(value);
    }, 300);
  };

  // Immediate search on Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      clearDebounce();
      updateUrl(term);
    }
  };

  // Clear search
  const handleClear = () => {
    clearDebounce();
    setTerm("");
    updateUrl("");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearDebounce();
    };
  }, []);

  return (
    <div className="relative w-full">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2" />

      <input
        type="text"
        value={term}
        placeholder="جستجوی کیبورد، سوییچ، کیپ‌کپ..."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="border-border bg-card text-foreground placeholder:text-muted-foreground h-11 w-full rounded-xl border pr-10 pl-10 text-sm transition-all outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-white/[0.03]"
      />

      {term.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="پاک کردن جستجو"
          className="text-muted-foreground hover:text-foreground absolute top-1/2 left-3 -translate-y-1/2 rounded-md p-1 transition-colors hover:bg-white/10"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
