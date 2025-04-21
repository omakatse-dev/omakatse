import React from "react";
import ItemCard from "./ItemCard";
import { ShopfrontProduct } from "@/types/Types";
import Image from "next/image";

export default function ItemsGrid({
  products,
  className,
}: {
  products: ShopfrontProduct[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 w-full gap-y-16 gap-x-8 ${className}`}
    >
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <div className="col-span-full w-full flex-col justify-items-center py-10">
          <Image
            src="/assets/NoItemsFound.svg"
            alt="No Items Found"
            width={320}
            height={242}
            className="mb-8"
          />
          <h4 className="mb-2">No items found</h4>
          <div className="bodyMD">Try searching for another keyword! </div>{" "}
        </div>
      )}
    </div>
  );
}
