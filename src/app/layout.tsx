import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Keyboard, ShoppingCartPlus } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KeyCraft Studio | کیبوردهای مکانیکی",
  description:
    "فروشگاه تخصصی کیبوردهای مکانیکال، سوییچ، کیپ‌کپ و لوازم جانبی میز کار",
};

export default function RootLayout({
  children, // slot for children
  adds,
}: Readonly<{
  children: React.ReactNode;
  adds: React.ReactNode;
}>) {
  const isAdmin = false;
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground relative flex min-h-screen flex-col overflow-x-hidden font-sans transition-colors duration-300"
      >
        {/* افکت نوری پس‌زمینه سایت */}
        <div className="theme-glow pointer-events-none absolute inset-x-0 top-0 h-[520px]" />

        {/* هدر مشترک - چسبیده به بالا (Sticky) */}
        <header className="border-border/80 bg-background/85 sticky top-0 z-50 mb-5 border-b backdrop-blur-md transition-colors duration-300">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="font-english flex items-center gap-3"
              dir="ltr"
              aria-label="KeyCraft home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber-300 text-zinc-950 shadow-md shadow-amber-300/20">
                <Keyboard className="size-5" aria-hidden="true" />
              </span>
              <span className="text-foreground text-lg font-bold tracking-tight">
                KeyCraft
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <span
                className="font-english border-border bg-card/70 text-muted-foreground hidden rounded-full border px-3 py-1.5 text-xs tracking-widest sm:inline-block"
                dir="ltr"
              >
                MECHANICAL KEYBOARDS
              </span>
              <ThemeToggle />
              <Link
                href="/cart"
                className="border-border bg-card/70 text-foreground flex size-9 items-center justify-center rounded-xl border transition hover:border-amber-500/40 hover:bg-amber-100/70 hover:text-amber-800 dark:hover:bg-white/10 dark:hover:text-amber-300"
                aria-label="سبد خرید"
              >
                <ShoppingCartPlus className="size-4" />
              </Link>
            </div>
          </div>
        </header>

        {/* محتوای صفحات (کودکان Layout) */}
        <main className="relative z-10 flex-1">{children}</main>
        <div className="mx-auto my-10 flex justify-center">
          {isAdmin ? adds : null}
        </div>
        {/* فوتر مشترک */}
        <footer className="border-border/80 bg-card/60 text-muted-foreground relative z-10 border-t py-6 text-center text-xs transition-colors duration-300">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6 lg:px-8">
            <p>© 2026 KeyCraft Studio. تمامی حقوق محفوظ است.</p>
            <p dir="ltr" className="font-english text-muted-foreground">
              Crafted for Mechanical Keyboard Enthusiasts
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
