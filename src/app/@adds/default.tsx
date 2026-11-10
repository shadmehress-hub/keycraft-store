import AddsSlot from "./page";

// این کامپوننت باعث می‌شود حتی اگر کاربر به صفحات دیگر رفت، بنر حفظ شود
export default function DefaultAdds() {
  return <AddsSlot />;
  // اگر می‌خواستی بنر فقط در صفحه اصلی باشد و در صفحات دیگر محو شود، می‌نوشتی:
  //   return null;
}
