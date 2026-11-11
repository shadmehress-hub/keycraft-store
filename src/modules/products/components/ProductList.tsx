import React from "react";
import ProductItem, { type ProductItemData } from "./ProductItem";

interface ProductListProps {
  products: ProductItemData[];
  emptyMessage?: string;
}

function ProductList({ products, emptyMessage }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 p-8 text-center dark:border-white/10 dark:bg-white/[0.01]">
        <p className="text-base font-semibold text-foreground">محصولی یافت نشد</p>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {emptyMessage ?? "هنوز محصولی در این بخش ثبت نشده است."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
