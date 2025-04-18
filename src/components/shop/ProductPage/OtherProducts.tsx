import React from "react";
import ProductCard from "./ProductCard";
import { OtherProductsProps } from "@/types/Types";

const OtherProducts: React.FC<OtherProductsProps> = ({ products }) => {
  return (
    <div className="bg-pink-pastel flex flex-col items-center py-10 md:py-15 px-6 md:px-10 gap-6 md:gap-10 w-full">
      <h4 className="text-center">Other products you might be interested in</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 md:max-w-7xl w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default OtherProducts;
