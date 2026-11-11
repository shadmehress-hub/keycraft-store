"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/modules/cart/store/useCartStore";

const CartBadge = () => {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || totalItems === 0) {
    return null;
  }

  return (
    <span
      dir="ltr"
      aria-label={`تعداد اقلام سبد خرید: ${totalItems}`}
      className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-zinc-950 shadow-sm shadow-amber-500/30 ring-2 ring-background animate-in zoom-in-50 duration-200"
    >
      {totalItems > 99 ? "+99" : totalItems.toLocaleString("fa-IR")}
    </span>
  );
};

export default CartBadge;
