import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/Utils";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    featuredImage: {
      url: string;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    variants?: {
      nodes: { id: string }[];
    };
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const numericID = product.id.split("/").pop();
  const hasMultipleVariants = (product.variants?.nodes.length || 0) > 1;

  return (
    <Link href={`/shop/${numericID}`}>
      <Image
        src={product.featuredImage.url}
        alt={product.title}
        width={200}
        height={200}
        className="border-gray-200 rounded-xl md:rounded-[1.25rem] p-4 bg-white w-full aspect-square object-fit mb-4"
      />
      <h3 className="bodyLG mb-2">{product.title}</h3>
      {hasMultipleVariants && (
        <p className="bodyMD text-gray-500">More options available</p>
      )}
      <p className="bodyMD mb-1">
        {hasMultipleVariants ? "from AED " : "AED "}
        {formatPrice(product.priceRange.minVariantPrice.amount)}
      </p>
    </Link>
  );
};

export default ProductCard;
