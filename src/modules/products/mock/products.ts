export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  inStock: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "lumina-75-custom",
    name: "کیبورد مکانیکال کاستوم Lumina 75%",
    category: "کیبورد مکانیکی",
    price: 8500000,
    image: "/products/lumina.jpg",
    images: ["/products/lumina.jpg"],
    description:
      "بدنه تمام آلومینیوم CNC با طراحی گسکت مانت، پلیت پلی‌کربنات و فوم سه‌لایه صداگیری شده.",
    inStock: true,
  },
  {
    id: "gateron-oil-king",
    name: "پک سوییچ خطی Gateron Oil King (۹۰ عددی)",
    category: "سوییچ و مادینگ",
    price: 1950000,
    image: "/products/switch.jpg",
    images: ["/products/switch.jpg"],
    description: "سوییچ‌های خطی روغن‌کاری شده با ساقه روان و صدای عمیق بم.",
    inStock: true,
  },
  {
    id: "botanical-pbt-set",
    name: "ست کامل کیپ‌کپ Botanical PBT Dyesub",
    category: "کیپ‌کپ و لوازم جانبی",
    price: 2100000,
    image: "/products/keyboard-green.jpg",
    images: ["/products/keyboard-green.jpg"],
    description:
      "پروفایل چری با پلاستیک PBT ضخیم و چاپ حرارتی مقاوم در برابر سایش.",
    inStock: true,
  },
  {
    id: "walnut-desk-shelf",
    name: "استند و شلف رومیزی چوب گردو و آلومینیوم",
    category: "اکسسوری ستاپ",
    price: 3400000,
    image: "/products/stand.jpg",
    images: ["/products/stand.jpg"],
    description:
      "استند چوب گردو طبیعی با پایه‌های ارگونومیک برای بهینه‌سازی فضای کاری.",
    inStock: false,
  },
];
