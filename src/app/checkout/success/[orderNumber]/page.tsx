import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, PackageCheck, ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui";

interface SuccessPageProps {
  // Next.js 16 Guardrail: params yek Promise hast
  params: Promise<{ orderNumber: string }>;
}

function OrderSuccessSkeleton() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 animate-pulse">
      <div className="flex flex-col items-center text-center">
        <div className="size-20 rounded-3xl bg-zinc-800" />
        <div className="mt-6 h-6 w-36 rounded-full bg-zinc-800" />
        <div className="mt-3 h-8 w-64 rounded-lg bg-zinc-800" />
        <div className="mt-2 h-4 w-96 rounded bg-zinc-800" />
        <div className="mt-4 h-10 w-48 rounded-xl bg-zinc-800" />
      </div>
      <div className="mt-10 h-72 rounded-2xl border border-zinc-800 bg-zinc-900/40" />
    </main>
  );
}

async function OrderSuccessContent({ params }: SuccessPageProps) {
  const { orderNumber } = await params;

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 animate-in fade-in-50 duration-300">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500 shadow-xl shadow-emerald-500/10 dark:bg-emerald-500/15 dark:text-emerald-400">
          <CheckCircle2 className="size-11 stroke-[2.2]" />
        </div>

        <span className="mt-6 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          پرداخت موفق و تایید شده
        </span>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          از خرید شما سپاسگزاریم!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          سفارش شما با شناسه پیگیری اختصاصی زیر در سیستم پردازش شد و به زودی آماده ارسال خواهد شد.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 font-mono text-sm text-foreground dark:border-white/10 dark:bg-white/[0.03]">
          <span className="text-muted-foreground font-sans text-xs">شماره پیگیری:</span>
          <span className="font-bold text-amber-500 text-base" dir="ltr">{order.orderNumber}</span>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
        <div className="border-b border-border bg-muted/30 px-6 py-4 dark:border-white/10">
          <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
            <PackageCheck className="size-4.5 text-amber-500" />
            رسید و جزئیات فاکتور سفارش
          </h2>
        </div>

        <div className="p-6">
          {/* Order Details Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-6 border-b border-border">
            <div>
              <span className="text-xs text-muted-foreground block">نام خریدار</span>
              <span className="text-sm font-semibold text-foreground mt-1 block">{order.customerName}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">شماره تماس</span>
              <span className="text-sm font-semibold text-foreground mt-1 block font-mono" dir="ltr">{order.phoneNumber}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs text-muted-foreground block">نشانی تحویل گیرنده</span>
              <span className="text-sm text-foreground mt-1 block leading-relaxed">{order.address}</span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="divide-y divide-border pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              اقلام سفارش ({order.items.length})
            </h3>
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-md bg-muted text-xs font-semibold text-foreground">
                    {item.quantity}×
                  </span>
                  <span className="font-medium text-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">
                  {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                </span>
              </div>
            ))}
          </div>

          <div className="my-6 h-px w-full bg-border" />

          {/* Pricing Total */}
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>هزینه ارسال:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">رایگان</span>
            </div>
            <div className="flex justify-between text-base font-bold text-foreground sm:text-lg pt-2">
              <span>مبلغ کل پرداخت شده:</span>
              <span className="text-amber-800 dark:text-amber-300">
                {order.totalPrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild className="h-11 rounded-xl bg-amber-400 px-7 font-semibold text-zinc-950 shadow-md shadow-amber-400/20 hover:bg-amber-300">
          <Link href="/products" className="flex items-center gap-2">
            <ShoppingBag className="size-4" />
            ادامه خرید از فروشگاه
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-11 rounded-xl px-6">
          <Link href="/" className="flex items-center gap-2">
            بازگشت به صفحه اصلی
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
      </div>
    </main>
  );
}

export default function OrderSuccessPage(props: SuccessPageProps) {
  return (
    <Suspense fallback={<OrderSuccessSkeleton />}>
      <OrderSuccessContent {...props} />
    </Suspense>
  );
}
