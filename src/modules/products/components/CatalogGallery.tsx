import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { Button } from "@/components/ui";
import type { Product } from "@/modules/products/mock/products";

// پراپ اختیاری isModal اضافه شد
export default function CatalogGallery({
  product,
  isModal = false,
}: {
  product: Product;
  isModal?: boolean;
}) {
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // متغیری برای تشخیص تک‌عکسی بودن
  const isSingleImage = galleryImages.length === 1;

  return (
    <div
      className={`mx-auto w-full max-w-6xl ${
        isModal
          ? "px-4 pt-14 pb-5 sm:px-7 sm:pt-16 sm:pb-7"
          : "px-4 py-10 sm:px-6 lg:px-8"
      }`}
    >
      {/* هدر صفحه گالری */}
      <div
        className={`mb-6 flex flex-col justify-between gap-3 border-b border-stone-300/60 pb-5 sm:flex-row sm:items-center dark:border-white/10 ${isModal ? "sm:mb-5 sm:pb-4" : "sm:mb-8 sm:pb-6"}`}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
            <Images className="size-4" />
            <span>گالری تصاویر محصول</span>
          </div>
          <h1 className="text-foreground mt-2 max-w-full text-lg leading-8 font-bold break-words sm:text-2xl">
            {product.name}
          </h1>
        </div>

        {/* دکمه فقط زمانی نمایش داده می‌شود که گالری به عنوان یک صفحه مجزا (نه مودال) باز شده باشد */}
        {!isModal && (
          <Button asChild variant="outline" className="w-fit rounded-xl">
            <Link href="/products" className="flex items-center gap-2">
              <ArrowRight className="size-4" />
              بازگشت به محصولات
            </Link>
          </Button>
        )}
      </div>

      {/* گرید نمایش عکس‌ها با چیدمان شرطی */}
      <div
        className={`grid gap-4 sm:gap-5 ${
          isSingleImage
            ? "mx-auto max-w-2xl grid-cols-1" // حالت تک عکسی: وسط‌چین با عرض محدود
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // حالت چند عکسی: گرید کامل
        }`}
      >
        {galleryImages.map((imgSrc, index) => (
          <div
            key={index}
            className="border-border group relative aspect-[4/3] overflow-hidden rounded-2xl border bg-stone-200 shadow-lg dark:border-white/10 dark:bg-zinc-950"
          >
            <Image
              src={imgSrc}
              alt={`${product.name} - تصویر ${index + 1}`}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              dir="ltr"
              className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-xs text-zinc-200 backdrop-blur-md"
            >
              0{index + 1} / 0{galleryImages.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
