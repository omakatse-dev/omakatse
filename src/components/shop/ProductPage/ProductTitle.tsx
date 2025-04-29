"use client";

import { ProductDetailsType, Review } from "@/types/Types";
import { StarIcon } from "@heroicons/react/20/solid";
import Button from "@/components/common/Button";
import Tag from "../../common/Tag";
import Image from "next/image";
import ProductTabs from "../../common/ProductTabs";
import ColorTabs from "../../common/ColorTabs";
import CounterButton from "@/components/common/CounterButton";
import { formatPrice } from "@/utils/Utils";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import RestockModal from "./RestockModal";
import { useState } from "react";
import { ProductOption } from "@/types/admin.types";

interface ProductTitleProps {
  details: ProductDetailsType;
  className?: string;
  reviews?: Review[];
  selectedOptions: ProductOption[];
  setSelectedOptions: (options: ProductOption[]) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export default function ProductTitle({
  details,
  className,
  reviews,
  selectedOptions,
  setSelectedOptions,
  quantity,
  setQuantity,
}: ProductTitleProps) {
  const { openCart } = useUIStore();
  const [showRestockModal, setShowRestockModal] = useState(false);
  const handleSelectOption = (optionIndex: number, value: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[optionIndex] = {
      ...newSelectedOptions[optionIndex],
      name: newSelectedOptions[optionIndex].name,
      values: [value],
      translations: newSelectedOptions[optionIndex].translations || [],
    };
    setSelectedOptions(newSelectedOptions);
  };

  const selectedVariant = details.variants.nodes.find((variant) => {
    return (
      variant.selectedOptions.length === selectedOptions.length &&
      variant.selectedOptions.every((option) =>
        selectedOptions.some(
          (selected) =>
            selected.name === option.name && selected.values[0] === option.value
        )
      )
    );
  });

  const addItem = useCartStore((state) => state.addItem);
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const addToCartHandler = () => {
    // if item is already in cart, update the quantity
    console.log(selectedOptions)
    const item = useCartStore
      .getState()
      .items.find((item) => item.id === selectedVariant?.id);
    if (item) {
      changeQuantity(item, item.quantity + quantity);
    } else {
      addItem({
        id: selectedVariant?.id || "", //this is the variant id
        name: details.title,
        price: selectedVariant?.price.amount || "",
        compareAtPrice: selectedVariant?.compareAtPrice?.amount || "",
        quantity: quantity,
        image: details.images.nodes[0].url,
        options: selectedOptions,
      });
    }
    openCart();
  };

  const rating = reviews?.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
  const totalReviews = reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const partialFill = rating % 1;

  const tagColorMapping = {
    "Box Exclusive": "bg-green",
    "Selling Fast": "bg-yellow-pastel",
    New: "bg-yellow",
  } as const;

  const getTagColor = (tag: string) => {
    return tagColorMapping[tag as keyof typeof tagColorMapping] || "bg-pink";
  };
  console.log(selectedVariant?.quantityAvailable);
  return (
    <>
      <div className={`flex flex-col px-6 md:p-0 md:w-1/2 ${className}`}>
        <div className="flex flex-row justify-between mb-2">
          <div>
            {selectedVariant?.quantityAvailable !== undefined &&
              selectedVariant?.quantityAvailable > 0 &&
              details.tags.length > 0 &&
              details.tags.map((tag) => (
                <Tag key={tag} className={getTagColor(tag)}>
                  {tag}
                </Tag>
              ))}
            {(!selectedVariant?.quantityAvailable ||
              selectedVariant?.quantityAvailable === 0) && (
              <Tag>Out of Stock</Tag>
            )}
            <div className="bodyXL text-gray-800 font-normal mt-2">
              {details.description}
            </div>
          </div>
          <Image
            src="/assets/CatIcon.svg"
            alt="Cat Icon"
            width={24}
            height={24}
            className="bg-white rounded-full aspect-square h-10 w-10 p-2"
          />
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">{details.title}</h3>

            <div className="bodyXL flex gap-2">
              <div>
                AED {formatPrice(details.variants.nodes[0].price.amount)}
              </div>
              {details.variants.nodes[0].compareAtPrice && (
                <div className="line-through text-gray-500">
                  {"AED " +
                    formatPrice(
                      details.variants.nodes[0].compareAtPrice.amount
                    )}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${
                      index < fullStars
                        ? "text-yellow"
                        : index === fullStars && partialFill > 0
                        ? "text-yellow"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {totalReviews} reviews
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {details.options.length > 1 &&
              details.options.map((option, idx) =>
                option.name === "Color" ? (
                  <div className="flex flex-col gap-2" key={option.name}>
                    <div className="flex flex-row gap-4">
                      <ColorTabs
                        tabs={option.optionValues.map((value) => ({
                          name: value.name,
                        }))}
                        selectedTab={selectedOptions[idx].values[0]}
                        onChange={(value) => handleSelectOption(idx, value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2" key={option.name}>
                    <b className="bodyMD font-normal">{option.name}</b>
                    <div className="flex flex-row gap-4">
                      <ProductTabs
                        tabs={option.optionValues.map((value) => ({
                          name: value.name,
                        }))}
                        selectedTab={selectedOptions[idx].values[0]}
                        onChange={(value) => handleSelectOption(idx, value)}
                      />
                    </div>
                  </div>
                )
              )}
          </div>
          {details.tags.includes("Box Exclusive") ? (
            <Button disabled>This is a box exclusive product</Button>
          ) : selectedVariant?.quantityAvailable &&
            selectedVariant?.quantityAvailable > 0 ? (
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                <CounterButton
                  count={quantity}
                  setCount={setQuantity}
                  min={1}
                  max={selectedVariant?.quantityAvailable || 1}
                />
              </div>

              <Button className="" onClick={addToCartHandler}>
                Add to Cart - AED{" "}
                {formatPrice(
                  (Number(selectedVariant?.price.amount) * quantity).toString()
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowRestockModal(true)}
              className="w-full"
            >
              Notify me when available
            </Button>
          )}
        </div>
      </div>
      {showRestockModal && (
        <RestockModal
          closeModal={() => setShowRestockModal(false)}
          variantId={selectedVariant?.id || ""}
        />
      )}
    </>
  );
}
