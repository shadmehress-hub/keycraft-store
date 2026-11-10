import { ArrowLeft, Keyboard } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui";

function Welcome() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-14 pb-20 text-center sm:px-6 sm:pt-20">
      <div className="border-border bg-card mb-5 flex size-14 items-center justify-center rounded-2xl border text-amber-700 shadow-lg shadow-stone-900/5 dark:border-white/10 dark:bg-white/5 dark:text-amber-300 dark:shadow-black/20">
        <Keyboard className="size-7" aria-hidden="true" />
      </div>
      <p
        className="font-english text-xs font-semibold tracking-[0.24em] text-amber-800 dark:text-amber-300/90"
        dir="ltr"
      >
        WELCOME TO KEYCRAFT
      </p>
      <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
        تجربهٔ تایپ، به سبک خودت
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-7 sm:text-base">
        کیبوردهای مکانیکال و لوازم جانبی برای میز کاری که دوستش داری.
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full px-6">
        <Link href="/products">
          دیدن محصولات
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
      </Button>
    </section>
  );
}

export default Welcome;
