import { ProductImageNode } from "@/types/Types";
import Image from "next/image";
import React from "react";

export default function ProductImages({
  images,
}: {
  images: ProductImageNode;
}) {
  return (
    <div className="flex flex-row gap-5 w-full">
      <div className="flex flex-col gap-5 w-1/8">
        {images.nodes.map((image) => (
          <Image
            src={image.url}
            alt="product"
            key={image.url}
            width={80}
            height={80}
            className="rounded-xl border-primary"
          />
        ))}
      </div>
      <Image
        src={images.nodes[0].url}
        alt="product"
        className="bg-gray-500 rounded-xl w-7/8 aspect-square border-primary"
        width={516}
        height={516}
      />
    </div>
  );
}
