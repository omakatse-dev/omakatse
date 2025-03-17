import React from "react";
import ProductTitle from "./ProductPage/ProductTitle";
import ProductDescription from "./ProductPage/ProductDescription";
import ProductImages from "./ProductPage/ProductImages";
import { ProductDetailsType } from "@/types/Types";

export default function ProductDetails({
  product,
}: {
  product: ProductDetailsType;
}) {
  return (
    <div className="flex flex-col md:pt-10 pb-20 w-screen max-w-7xl mt-32 ">
      <div className="md:pt-10 pb-15 flex md:flex-row flex-col gap-8 md:gap-25 w-full">
        <div className="flex flex-col gap-15 md:w-1/2">
          <ProductImages images={product.images} />
          {product.metafield && (
            <ProductDescription description={product.metafield.value} className="hidden md:block"/>
          )}
        </div>
        <ProductTitle className="md:sticky md:top-52 h-fit" details={product} />
        {product.metafield && (
            <ProductDescription description={product.metafield.value} className="md:hidden px-8"/>
          )}
      </div>
    </div>
  );
}
