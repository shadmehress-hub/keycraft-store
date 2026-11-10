import React from "react";
import { mockProducts } from "../mock/products";
import ProductItem from "./ProductItem";

function ProductList() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {mockProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
