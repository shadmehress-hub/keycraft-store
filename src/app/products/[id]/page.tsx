import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetail from "@/modules/products/components/ProductDetail";
import ProductDetailSkeleton from "@/modules/products/components/ProductDetailSkeleton";
import { mockProducts } from "@/modules/products/mock/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Dynamic SEO Metadata baraye har mahsool
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  let product = await prisma.product.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
  });

  if (!product) {
    const mock = mockProducts.find((item) => item.id === id);
    if (mock) product = mock as unknown as typeof product;
  }

  if (!product) {
    return {
      title: "محصول یافت نشد",
    };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug || product.id}`,
    },
    openGraph: {
      title: `${product.name} | KeyCraft Studio`,
      description: product.description,
      url: `https://keycraft.ir/products/${product.slug || product.id}`,
      type: "website",
      images: [
        {
          url: product.coverImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.coverImage],
    },
  };
}

async function ProductPageContent({ params }: PageProps) {
  const { id } = await params;

  // 1. Aval tooye database-e PostgreSQL (Prisma) donbale mahsool migardim
  let product = await prisma.product.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
  });

  // 2. Age tooye DB nabood, fallback be mockProducts
  if (!product) {
    const mock = mockProducts.find((item) => item.id === id);
    if (mock) {
      product = mock as unknown as typeof product;
    }
  }

  if (!product) notFound();

  // JSON-LD Schema.org baraye Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://keycraft.ir${product.coverImage}`,
    description: product.description,
    sku: product.slug,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IRR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "KeyCraft Studio",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}
