"use client";

import { ProductImageNode } from "@/types/Types";
import Image from "next/image";
import React , { useState } from "react";

export default function ProductImages({
  images,
}: {
  images: ProductImageNode;
}) {
  const [selectedImage, setSelectedImage] = useState(images.nodes[0].url);
  return (
    <div className="flex flex-row gap-5 w-full">
      <div className="flex flex-col gap-5 w-1/8">
        {images.nodes.map((image) => (
        <button
          key={image.url}
          onClick={() => setSelectedImage(image.url)}
          className={`border-2 p-1 rounded-xl ${
            selectedImage === image.url ? "border-primary" : "border-transparent"
          }`}
        >
          <Image
            src={image.url}
            alt="product"
            key={image.url}
            width={80}
            height={80}
            className="rounded-xl border-primary"
          />
        </button>
      ))}
      </div>
      <Image
        src={selectedImage}
        alt="product"
        className="bg-gray-500 rounded-xl w-7/8 aspect-square border-primary"
        width={516}
        height={516}
      />
    </div>
  );
}
