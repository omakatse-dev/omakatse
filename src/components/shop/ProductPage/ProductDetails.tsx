"use client";
import React from "react";
import ProductTitle from "./ProductTitle";
import ProductDescription from "./ProductDescription";
import ProductImages from "./ProductImages";
import { ProductDetailsType, Review, OtherProductsProps } from "@/types/Types";
import OtherProducts from "./OtherProducts";
import ReviewSection from "./ReviewsSection";
import { useState } from "react";
import AddToCartSection from "@/components/common/AddToCartSection";
import { ProductOption } from "@/types/admin.types";

export default function ProductDetails({
  product,
  reviews,
  relatedProducts,
}: {
  product: ProductDetailsType;
  reviews: Review[];
  relatedProducts: OtherProductsProps["products"];
}) {
  const defaultOptions = product.options.map((option) => ({
    id: option.id || "",
    name: option.name,
    values: [option.optionValues[0].name],
    optionValues: option.optionValues,
    position: option.position || 0,
    translations: [],
  }));

  const [selectedOptions, setSelectedOptions] =
    useState<ProductOption[]>(defaultOptions);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col md:pt-10 mt-32 md:mt-14 md:px-12 max-w-7xl w-screen">
        <div className="md:pt-10 flex md:flex-row flex-col gap-8 md:gap-25 w-full">
          <div className="flex flex-col gap-15 md:w-1/2 w-full md:flex-shrink-0 md:basis-1/2">
            <ProductImages images={product.images} />
            {product.metafield && (
              <ProductDescription
                description={product.metafield.value}
                className="hidden md:block"
              />
            )}
          </div>
          <ProductTitle
            className="md:sticky md:top-32 h-fit "
            details={product}
            reviews={reviews}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            quantity={quantity}
            setQuantity={setQuantity}
          />
          {product.metafield && (
            <ProductDescription
              description={product.metafield.value}
              className="md:hidden px-6"
            />
          )}
        </div>
        <div className="px-6 md:px-0">
          <ReviewSection reviews={reviews} />
        </div>
      </div>
      <OtherProducts products={relatedProducts} />
      <AddToCartSection
        details={product}
        selectedOptions={selectedOptions}
        quantity={quantity}
        className="sticky bottom-0 h-fit z-10"
      />
    </div>
  );
}
