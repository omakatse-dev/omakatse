import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  };
}

const getProductNumericID = (productId: string): string => {
  return productId.split("/").pop() || ""; // Extracts the last part after '/' which is the numeric ID
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const numericID = getProductNumericID(product.id); 
  return (
    <Link href={`/shop/${numericID}`}>
      <Image
        src={product.featuredImage.url}
        alt={product.title}
        width={200}
        height={200}
        className="border-gray-200 rounded-lg p-4 bg-white w-full aspect-square object-fit mb-4"
      />
      <h3 className="bodyLG mb-2">{product.title}</h3>
      <p className="bodyMD">${product.priceRange.minVariantPrice.amount}</p>
    </Link>
  );
};

export default ProductCard;