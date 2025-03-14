import { ShopfrontProduct } from "@/types/Types";
import React from "react";
import Tag from "../common/Tag";
import Link from "next/link";

export default function ItemCard({ product }: { product: ShopfrontProduct }) {
  const id = product.id.split("/").pop();
  return (
    <Link href={`/shop/${id}`} className="relative">
      {product.tags.length > 0 && (
        <Tag
          className={`absolute top-4 left-4 ${
            product.tags[0] === "New" ? "bg-yellow" : "bg-pink"
          }`}
        >
          {product.tags[0]}
        </Tag>
      )}
      <img
        src={product.featuredImage.url}
        className="w-full h-64 bg-gray-200 rounded-lg object-contain"
      />
      <div className="bodyLG text-black font-semibold mt-4">
        {product.title}
      </div>
      <div className="bodyMD text-black mt-2">
        AED {product.priceRange.minVariantPrice.amount}
      </div>
    </Link>
  );
}
