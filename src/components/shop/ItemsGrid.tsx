import React from "react";
import ItemCard from "./ItemCard";
import { ShopfrontProduct } from "@/types/Types";

export default function ItemsGrid({
  products,
  className,
}: {
  products: ShopfrontProduct[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 w-full gap-y-16 gap-x-8 ${className}`}>
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
      {products.length === 0 && <div>No Items found</div>}
    </div>
  );
}
