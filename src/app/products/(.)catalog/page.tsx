import { Suspense } from "react";
import { mockProducts } from "@/modules/products/mock/products";
import CatalogGallery from "@/modules/products/components/CatalogGallery";
import Modal from "@/modules/products/components/Modal";

interface InterceptedCatalogProps {
  searchParams: Promise<{ id?: string }>;
}

async function InterceptedContent({ searchParams }: InterceptedCatalogProps) {
  const { id } = await searchParams;

  // اگر id نبود یا محصول پیدا نشد، مودال باز نمی‌شود
  if (!id) return null;
  const product = mockProducts.find((item) => item.id === id);
  if (!product) return null;

  return (
    <Modal>
      {/* 
        چون CatalogGallery روتر و پدینگ خودش را دارد،
        با قرار دادنش در مودال، همان ظاهر بدون نیاز به یک خط کدِ تکراری رندر می‌شود 
      */}
      <CatalogGallery product={product} isModal />
    </Modal>
  );
}

export default function InterceptedCatalogPage(props: InterceptedCatalogProps) {
  return (
    <Suspense fallback={null}>
      <InterceptedContent {...props} />
    </Suspense>
  );
}
