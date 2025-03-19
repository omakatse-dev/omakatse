import React from "react";
import ProductCard from "./ProductCard";

interface OtherProductsProps {
  products: {
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
  }[];
}

const OtherProducts: React.FC<OtherProductsProps> = ({ products }) => {
  return (
    <div className="bg-pink-pastel flex flex-col py-10 md:py-15 px-6 md:px-10 gap-6 md:gap-10">
      <h4 className="text-center">Other products you might be interested in</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OtherProducts;
