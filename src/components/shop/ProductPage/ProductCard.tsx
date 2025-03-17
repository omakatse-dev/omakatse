import React from "react";
import Image from "next/image";

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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="">
      <Image
        src={product.featuredImage.url}
        alt={product.title}
        width={200}
        height={200}
        className="border-gray-200 rounded-lg p-4 bg-white w-full aspect-square object-fit mb-4"
      />
      <h3 className="bodyLG mb-2">{product.title}</h3>
      <p className="bodyMD">${product.priceRange.minVariantPrice.amount}</p>
    </div>
  );
};

export default ProductCard;