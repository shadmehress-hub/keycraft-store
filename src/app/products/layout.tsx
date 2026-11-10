import type { ReactNode } from "react";

function ProductsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="min-h-full">{children}</div>;
}

export default ProductsLayout;
