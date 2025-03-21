"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ReviewItemSummary() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName") || "";
  const imageUrl = searchParams.get("imageUrl") || "";
  const price = searchParams.get("price") || "";

  return (
    <div className="flex gap-5">
      <Image
        src={imageUrl}
        alt={productName}
        width={60}
        height={60}
        className="h-16"
      />
      <div className="flex flex-col gap-2">
        <p className="font-semibold bodyMD">{productName}</p>
        <p className="bodyLG">AED {price}</p>
      </div>
    </div>
  );
}
