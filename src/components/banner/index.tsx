import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";

import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";

const bannerImages = [img1, img2, img3, img4];

export default function Banner() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <Carousel dir="ltr" className="w-full">
        <CarouselContent className="-ml-0">
          {bannerImages.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative h-[260px] overflow-hidden rounded-3xl border border-stone-300 bg-zinc-900 shadow-2xl shadow-stone-900/10 sm:h-[380px] md:h-[440px] lg:h-[520px] dark:border-white/10 dark:shadow-black/30">
                <Image
                  src={image}
                  alt={`KeyCraft mechanical keyboard showcase ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white sm:p-10">
                  <div className="max-w-md text-right" dir="rtl">
                    <span
                      className="font-english mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.2em] text-white/80 backdrop-blur-sm"
                      dir="ltr"
                    >
                      BUILT FOR YOUR DESK
                    </span>
                    <h2 className="text-xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                      حسِ تایپ دلخواهت را پیدا کن
                    </h2>
                    <p className="mt-2 text-xs leading-6 text-white/75 sm:text-sm sm:leading-7 lg:text-base">
                      کیبوردها و جزئیاتی برای میزی که با سبک کار تو هماهنگ است.
                    </p>
                  </div>
                  <span
                    dir="ltr"
                    className="font-english hidden rounded-full border border-white/20 bg-black/25 px-4 py-2 text-sm text-white/80 backdrop-blur-sm sm:block"
                  >
                    0{index + 1} <span className="text-white/40">/ 04</span>
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 z-10 border-white/20 bg-black/35 text-white backdrop-blur-md hover:bg-black/60 disabled:opacity-30 sm:left-5" />
        <CarouselNext className="right-3 z-10 border-white/20 bg-black/35 text-white backdrop-blur-md hover:bg-black/60 disabled:opacity-30 sm:right-5" />
      </Carousel>
    </div>
  );
}
