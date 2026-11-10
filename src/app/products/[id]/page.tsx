import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductDetail from "@/modules/products/components/ProductDetail";
import { mockProducts } from "@/modules/products/mock/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function ProductPageContent({ params }: PageProps) {
  const { id } = await params;
  const product = mockProducts.find((item) => item.id === id);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-6xl justify-center py-24 text-sm text-zinc-400">
          در حال بارگذاری محصول...
        </div>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}
