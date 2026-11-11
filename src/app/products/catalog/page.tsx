import { notFound } from "next/navigation";
import { Suspense } from "react";
import CatalogGallery from "@/modules/products/components/CatalogGallery";
import { prisma } from "@/lib/prisma";
import { mockProducts } from "@/modules/products/mock/products";

interface CatalogPageProps {
  searchParams: Promise<{ id?: string }>;
}

async function CatalogPageContent({ searchParams }: CatalogPageProps) {
  const { id } = await searchParams;

  if (!id) notFound();

  // 1. Aval dar database PostgreSQL peyda mikonim
  let product: any = await prisma.product.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
  });

  // 2. Fallback be mockProducts agar dar DB nabood
  if (!product) {
    product = mockProducts.find((item) => item.id === id);
  }

  if (!product) notFound();

  return <CatalogGallery product={product} />;
}

export default function CatalogPage(props: CatalogPageProps) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-6xl justify-center py-24 text-sm text-zinc-400">
          در حال بارگذاری گالری تصاویر...
        </div>
      }
    >
      <CatalogPageContent {...props} />
    </Suspense>
  );
}
