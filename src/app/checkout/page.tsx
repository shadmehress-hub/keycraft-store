"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CreditCard,
  Lock,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useCartStore } from "@/modules/cart/store/useCartStore";
import { createOrder } from "@/modules/checkout/actions/createOrder";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const clearCart = useCartStore((state) => state.clearCart);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    note: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="size-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">در حال بارگذاری صفحه تسویه‌حساب...</p>
      </main>
    );
  }

  // Agar sabad khali bashe
  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center animate-in fade-in-50 duration-300">
        <div className="flex size-18 items-center justify-center rounded-2xl border border-border bg-card text-amber-700 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-amber-300">
          <ShoppingBag className="size-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
          سبد خرید شما برای تسویه خالی است
        </h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
          برای تکمیل فرآیند ثبت سفارش، ابتدا باید محصولی به سبد خریدتان اضافه کنید.
        </p>
        <Button asChild className="mt-7 h-11 rounded-xl bg-amber-400 px-6 font-semibold text-zinc-950 shadow-md shadow-amber-400/20 hover:bg-amber-300">
          <Link href="/products">
            مشاهده محصولات و شروع خرید
          </Link>
        </Button>
      </main>
    );
  }

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client validation
    if (!formData.customerName.trim()) {
      setErrorMessage("لطفاً نام و نام خانوادگی خود را وارد کنید.");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMessage("لطفاً شماره موبایل خود را وارد کنید.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMessage("لطفاً آدرس پستی دقیق را وارد کنید.");
      return;
    }

    startTransition(async () => {
      const itemsPayload = items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      }));

      const res = await createOrder(formData, itemsPayload);

      if (!res.success) {
        setErrorMessage(res.error || "خطایی در ثبت سفارش رخ داد.");
        return;
      }

      // Sefaresh ba movafaghiat sabt shod!
      clearCart();
      router.push(`/checkout/success/${res.orderNumber}`);
    });
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-20 sm:px-6 lg:px-8 animate-in fade-in-50 duration-300">
      {/* Breadcrumb */}
      <nav aria-label="مسیر صفحه" className="text-muted-foreground mb-6 flex items-center gap-2 text-xs sm:text-sm">
        <Link href="/cart" className="transition-colors hover:text-amber-700 dark:hover:text-amber-300">
          سبد خرید
        </Link>
        <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
        <span className="text-foreground font-medium">تسویه‌حساب و پرداخت</span>
      </nav>

      <header className="mb-8 border-b border-border pb-6 sm:mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          تکمیل مشخصات و پرداخت سفارش
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          اطلاعات گیرنده و آدرس پستی خود را جهت ارسال بسته وارد نمایید.
        </p>
      </header>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500 dark:text-red-400 animate-in fade-in duration-200">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Shipping Form (8 Columns) */}
          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.02]">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Truck className="size-4.5 text-amber-500" />
                مشخصات گیرنده و آدرس ارسال
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div>
                  <label htmlFor="customerName" className="mb-1.5 block text-xs font-semibold text-foreground">
                    نام و نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    placeholder="مثال: پارسا صادقی"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="mb-1.5 block text-xs font-semibold text-foreground">
                    شماره موبایل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    dir="ltr"
                    required
                    placeholder="09123456789"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode" className="mb-1.5 block text-xs font-semibold text-foreground">
                    کد پستی (۱۰ رقمی اختیاری)
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    dir="ltr"
                    placeholder="1234567890"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="mb-1.5 block text-xs font-semibold text-foreground">
                    آدرس کامل پستی <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    placeholder="استان، شهر، خیابان، پلاک، واحد..."
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background p-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>

                {/* Order Note */}
                <div className="sm:col-span-2">
                  <label htmlFor="note" className="mb-1.5 block text-xs font-semibold text-foreground">
                    توضیحات و یادداشت سفارش (اختیاری)
                  </label>
                  <input
                    id="note"
                    name="note"
                    type="text"
                    placeholder="توضیحاتی مانند زمان تحویل یا نکات بسته‌بندی..."
                    value={formData.note}
                    onChange={handleChange}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-white/10 dark:bg-white/[0.03]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-white/[0.02]">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <CreditCard className="size-4.5 text-amber-500" />
                انتخاب روش پرداخت
              </h2>

              <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 dark:border-amber-400/20 dark:bg-amber-400/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-4 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500">
                      <span className="size-1.5 rounded-full bg-zinc-950" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">درگاه پرداخت امن شتاب (شبیه‌سازی شاپرک)</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">پرداخت با کلیه کارت‌های عضو شبکه شتاب</p>
                    </div>
                  </div>
                  <Lock className="size-4 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-border bg-card/90 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <h2 className="text-base font-bold text-foreground">
                خلاصه اقلام ({totalItems.toLocaleString("fa-IR")})
              </h2>

              {/* Items mini list */}
              <div className="mt-4 max-h-60 space-y-3 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-stone-200 dark:border-white/10 dark:bg-zinc-950">
                      <Image src={item.coverImage} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.quantity.toLocaleString("fa-IR")} × {item.price.toLocaleString("fa-IR")} تومان
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-5 h-px w-full bg-border" />

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>هزینه اقلام</span>
                  <span className="font-semibold text-foreground">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>هزینه بسته‌بندی و ارسال</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">رایگان</span>
                </div>
                <div className="my-3 h-px w-full bg-border" />
                <div className="flex justify-between text-sm font-bold text-foreground sm:text-base">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="text-amber-800 dark:text-amber-300">
                    {totalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="mt-6 h-12 w-full rounded-xl bg-amber-400 font-semibold text-zinc-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300 disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
                    در حال اتصال به درگاه و ثبت سفارش...
                  </span>
                ) : (
                  <span>تأیید نهایی و پرداخت آنلاین</span>
                )}
              </Button>

              <div className="mt-6 space-y-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-emerald-500" />
                  <span>تراکنش امن با پروتکل رمزنگاری SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="size-3.5 text-amber-500" />
                  <span>ارسال سریع با بسته‌بندی ضدضربه کی‌کرفت</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
