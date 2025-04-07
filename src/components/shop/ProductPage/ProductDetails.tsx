import React from "react";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductImages from "./ProductImages";
import { ProductDetailsType, Review } from "@/types/Types";

export default function ProductDetails({
  product,
  reviews,
}: {
  product: ProductDetailsType;
  reviews: Review[];
}) {
  return (
    <div className="flex flex-col md:pt-10 mt-32 md:px-12 max-w-7xl">
      <div className="md:pt-10 flex md:flex-row flex-col gap-8 md:gap-25 w-full">
        <div className="flex flex-col gap-15 md:w-1/2">
          <ProductImages images={product.images} />
          {product.metafield && (
            <ProductDescription
              description={product.metafield.value}
              className="hidden md:block"
            />
          )}
        </div>
        <ProductTitle className="md:sticky md:top-52 h-fit" details={product} reviews={reviews} />
        {product.metafield && (
          <ProductDescription
            description={product.metafield.value}
            className="md:hidden px-8"
          />
        )}
      </div>
    </div>
  );
}
