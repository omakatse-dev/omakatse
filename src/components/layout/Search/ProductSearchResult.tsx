import { ShopfrontProduct } from "@/types/Types";
import { formatPrice } from "@/utils/Utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductSearchResult({
  product,
}: {
  product: ShopfrontProduct;
}) {
  const id = product.id.split("/").pop();

  return (
    <Link href={`/shop/${id}`} className="flex w-full gap-5 py-4">
      <Image
        src={product.featuredImage.url}
        alt={product.title}
        width={30}
        height={30}
        className="w-16 aspect-square object-cover"
      />
      <div className="flex flex-col w-full justify-between">
        <div className="font-semibold bodyMD">{product.title}</div>
        <div className="bodySM text-gray-800">
          AED {formatPrice(product.priceRange.minVariantPrice.amount)}
        </div>
      </div>
    </Link>
  );
}
