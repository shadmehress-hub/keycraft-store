import ProductList from "../components/ProductList";
import { mockProducts } from "../mock/products";

function ProductListView() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12 lg:px-8">
      <header className="border-border mb-8 flex flex-col gap-3 border-b pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
            انتخاب KeyCraft
          </p>
          <h1 className="text-foreground mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            محصولات کیبورد و میز کار
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6 sm:text-base">
            از کیبورد مکانیکال تا قطعات و جزئیاتی که ستاپت را کامل می‌کنند.
          </p>
        </div>
        <p className="shrink-0 text-sm text-zinc-500">
          <span className="text-foreground font-medium">
            {mockProducts.length.toLocaleString("fa-IR")}
          </span>{" "}
          محصول
        </p>
      </header>
      <ProductList />
    </div>
  );
}

export default ProductListView;
