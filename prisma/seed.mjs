import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
      if (match) databaseUrl = match[1];
    }
  } catch {}
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const products = [
  // ──────────────── KEYBOARDS ────────────────
  {
    slug: "lumina-75-custom",
    name: "کیبورد مکانیکال کاستوم Lumina 75%",
    category: "KEYBOARDS",
    price: 8500000,
    stock: 8,
    inStock: true,
    coverImage: "/products/lumina.jpg",
    images: ["/products/lumina.jpg"],
    description: "بدنه تمام آلومینیوم CNC با طراحی گسکت مانت، پلیت پلی‌کربنات و فوم سه‌لایه صداگیری شده. شامل PCB هات‌سواپ ۵ پین با RGB جنوبی و نوار LED کناری.",
  },
  {
    slug: "tofu65-aluminum",
    name: "کیبورد مکانیکال Tofu65 آلومینیوم مشکی",
    category: "KEYBOARDS",
    price: 6200000,
    stock: 12,
    inStock: true,
    coverImage: "/products/tofu65-aluminum.jpg",
    images: ["/products/tofu65-aluminum.jpg"],
    description: "بدنه آلومینیوم CNC با فینیش مات مشکی و RGB زیرنوری Amber. پلیت برنجی، PCB هات‌سواپ و فوم دولایه. لایوت ۶۵ درصد کامپکت برای فضای بهینه روی میز.",
  },
  {
    slug: "samurai-red-keyboard",
    name: "کیبورد مکانیکال Samurai قرمز با ساب‌لجند ژاپنی",
    category: "KEYBOARDS",
    price: 7800000,
    stock: 5,
    inStock: true,
    coverImage: "/products/pbt-samurai-red.jpg",
    images: ["/products/pbt-samurai-red.jpg"],
    description: "طراحی Samurai با کیپ‌کپ‌های PBT قرمز و مشکی و ساب‌لجندهای هیراگانا ژاپنی. بدنه آلومینیوم تیره با مانت گسکت و سوییچ‌های خطی از پیش روغن‌کاری شده.",
  },
  {
    slug: "alice-layout-ergonomic",
    name: "کیبورد ارگونومیک Alice Layout کرم‌رنگ",
    category: "KEYBOARDS",
    price: 9200000,
    stock: 3,
    inStock: true,
    coverImage: "/products/alice-layout-keyboard.jpg",
    images: ["/products/alice-layout-keyboard.jpg"],
    description: "لایوت اسپلیت ارگونومیک Alice برای تایپ راحت‌تر و کاهش فشار مچ دست. بدنه اکریلیک فراستد با کیپ‌کپ پاستلی و PCB هات‌سواپ. مناسب تایپیست‌های حرفه‌ای.",
  },

  // ──────────────── SWITCHES ────────────────
  {
    slug: "gateron-oil-king",
    name: "پک سوییچ خطی Gateron Oil King (۹۰ عددی)",
    category: "SWITCHES",
    price: 1950000,
    stock: 25,
    inStock: true,
    coverImage: "/products/switch.jpg",
    images: ["/products/switch.jpg"],
    description: "سوییچ‌های خطی روغن‌کاری شده با ساقه روان و صدای عمیق بم. هاوزینگ مشکی Ink با فنر دو مرحله‌ای ۵۵ گرمی. بدون نیاز به فیلم و لوب اضافه.",
  },
  {
    slug: "cherry-mx-brown",
    name: "پک سوییچ تاکتایل Cherry MX Brown (۱۱۰ عددی)",
    category: "SWITCHES",
    price: 2400000,
    stock: 30,
    inStock: true,
    coverImage: "/products/cherry-mx-brown.jpg",
    images: ["/products/cherry-mx-brown.jpg"],
    description: "سوییچ‌های تاکتایل اصل Cherry آلمان با بامپ ملایم و نیروی فعال‌سازی ۴۵ گرمی. مناسب تایپ و گیمینگ. عمر ۱۰۰ میلیون کلیک با هاوزینگ شفاف.",
  },
  {
    slug: "kailh-box-jade",
    name: "پک سوییچ کلیکی Kailh Box Jade (۷۰ عددی)",
    category: "SWITCHES",
    price: 1650000,
    stock: 18,
    inStock: true,
    coverImage: "/products/kailh-box-jade.jpg",
    images: ["/products/kailh-box-jade.jpg"],
    description: "سوییچ‌های کلیکی ضخیم با کلیک‌بار فلزی و صدای رسا و مکانیکال واقعی. ساقه سبز Jade با نیروی ۶۰ گرمی. طراحی Box ضدگرد و غبار و ضدآب.",
  },

  // ──────────────── KEYCAPS ────────────────
  {
    slug: "botanical-pbt-set",
    name: "ست کامل کیپ‌کپ Botanical PBT Dyesub",
    category: "KEYCAPS",
    price: 2100000,
    stock: 14,
    inStock: true,
    coverImage: "/products/keyboard-green.jpg",
    images: ["/products/keyboard-green.jpg"],
    description: "پروفایل چری با پلاستیک PBT ضخیم و چاپ حرارتی مقاوم در برابر سایش. طرح گیاه‌شناسی با رنگ‌های سبز و کرم. سازگار با لایوت‌های ۶۰ تا ۱۰۰ درصد.",
  },
  {
    slug: "artisan-dragon-keycap",
    name: "کیپ‌کپ آرتیزان دست‌ساز طرح اژدها",
    category: "KEYCAPS",
    price: 890000,
    stock: 6,
    inStock: true,
    coverImage: "/products/artisan-keycap-dragon.jpg",
    images: ["/products/artisan-keycap-dragon.jpg"],
    description: "کیپ‌کپ آرتیزان دست‌ساز از رزین شفاف عسلی و مشکی با طرح اژدها و ذرات طلایی. هر قطعه یکتا و منحصر به فرد. پروفایل SA سازگار با سوییچ‌های MX.",
  },

  // ──────────────── ACCESSORIES ────────────────
  {
    slug: "walnut-desk-shelf",
    name: "استند و شلف رومیزی چوب گردو و آلومینیوم",
    category: "ACCESSORIES",
    price: 3400000,
    stock: 0,
    inStock: false,
    coverImage: "/products/stand.jpg",
    images: ["/products/stand.jpg"],
    description: "استند چوب گردو طبیعی با پایه‌های ارگونومیک آلومینیوم برس‌خورده. زاویه تایپ ۸ درجه برای راحتی بیشتر. دست‌ساز با روغن طبیعی و لبه‌های گرد.",
  },
  {
    slug: "coiled-cable-gold",
    name: "کابل کویل USB-C آویاتور مشکی-طلایی",
    category: "ACCESSORIES",
    price: 1250000,
    stock: 20,
    inStock: true,
    coverImage: "/products/coiled-cable-gold.jpg",
    images: ["/products/coiled-cable-gold.jpg"],
    description: "کابل کاستوم کویل‌شده با روکش پاراکورد مشکی مات و کانکتور آویاتور فلزی طلایی. طول ۱.۸ متر (۳۰ سانت کویل + ۱.۵ متر مستقیم). سازگار USB-C به USB-A.",
  },
  {
    slug: "desk-mat-dark",
    name: "دسک‌مت بزرگ مشکی با طرح هندسی",
    category: "ACCESSORIES",
    price: 950000,
    stock: 35,
    inStock: true,
    coverImage: "/products/desk-mat-dark.jpg",
    images: ["/products/desk-mat-dark.jpg"],
    description: "دسک‌مت ۹۰×۴۰ سانتی‌متر از جنس لاستیک طبیعی با سطح پارچه‌ای ضدلغزش. طرح خطوط هندسی ظریف در رنگ خاکستری و عسلی. لبه‌های دوخت‌شده ضدپرز.",
  },
  {
    slug: "wrist-rest-walnut",
    name: "زیرمچی ارگونومیک چوب گردو",
    category: "ACCESSORIES",
    price: 1100000,
    stock: 15,
    inStock: true,
    coverImage: "/products/wrist-rest-wood.jpg",
    images: ["/products/wrist-rest-wood.jpg"],
    description: "زیرمچی از چوب گردوی طبیعی با لبه‌های گرد و پرداخت روغنی. سطح صیقلی و نرم برای راحتی مچ هنگام تایپ طولانی. سایز TKL سازگار با کیبوردهای ۶۰ تا ۸۰ درصد.",
  },
  {
    slug: "durock-v2-stabilizers",
    name: "ست استابلایزر Durock V2 پیچی طلایی",
    category: "ACCESSORIES",
    price: 680000,
    stock: 40,
    inStock: true,
    coverImage: "/products/durock-stabilizer.jpg",
    images: ["/products/durock-stabilizer.jpg"],
    description: "استابلایزرهای پیچی (Screw-in) با سیم طلاکاری شده و هاوزینگ دودی شفاف. شامل ۴ عدد ۲u و ۱ عدد ۶.۲۵u. از پیش روغن‌کاری شده و آماده نصب.",
  },
  {
    slug: "keycap-puller-kit",
    name: "کیت ابزار کشنده کیپ‌کپ و سوییچ",
    category: "ACCESSORIES",
    price: 320000,
    stock: 50,
    inStock: true,
    coverImage: "/products/keycap-puller-kit.jpg",
    images: ["/products/keycap-puller-kit.jpg"],
    description: "کیت ابزار شامل کیپ‌کپ پولر فلزی با دستگیره طلایی و سوییچ پولر پلاستیکی. بسته‌بندی کامپکت و قابل حمل. ابزار ضروری برای هر علاقه‌مند کیبورد مکانیکال.",
  },
  {
    slug: "foam-dampening-kit",
    name: "کیت فوم صداگیری کیبورد (PE + کیس + پلیت)",
    category: "ACCESSORIES",
    price: 450000,
    stock: 22,
    inStock: true,
    coverImage: "/products/foam-dampening-kit.jpg",
    images: ["/products/foam-dampening-kit.jpg"],
    description: "مجموعه سه‌لایه فوم صداگیری شامل PE Foam، کیس فوم و پلیت فوم. قابل برش به اندازه دلخواه. کاهش چشمگیر صدای پینگ و هالو و بهبود صدای تاک تاک عمیق.",
  },
];

async function seed() {
  console.log("Seeding products...");
  for (const item of products) {
    await prisma.product.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
    console.log(`Upserted: ${item.name}`);
  }
  console.log("Seed finished successfully!");
}

seed()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
