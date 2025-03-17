"use client";

import { ProductDetailsType } from "@/types/Types";
import { useState } from "react";

import Button from "@/components/common/Button";
import Tag from "../../common/Tag";
import Image from "next/image";
import ProductTabs from "../../common/ProductTabs";
import ColorTabs from "../../common/ColorTabs";
import CounterButton from "@/components/common/CounterButton";
import { formatPrice } from "@/utils/Utils";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";

export default function ProductTitle({
  details,
  className,
}: {
  details: ProductDetailsType;
  className?: String;
}) {
  const defaultOptions = details.options.map((option) => {
    return {
      name: option.name,
      value: option.optionValues[0].name,
    };
  });

  const { openCart } = useUIStore();

  //an array of selected options
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);
  const [quantity, setQuantity] = useState(1);

  const handleSelectOption = (option: number, value: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[option] = {
      name: newSelectedOptions[option].name,
      value,
    };
    setSelectedOptions(newSelectedOptions);
  };

  const selectedVariant = details.variants.nodes.find((variant) => {
    return (
      variant.selectedOptions.length === selectedOptions.length &&
      variant.selectedOptions.every((option) =>
        selectedOptions.some(
          (selected) =>
            selected.name === option.name && selected.value === option.value
        )
      )
    );
  });
  const addItem = useCartStore((state) => state.addItem);
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const addToCartHandler = () => {
    // if item is already in cart, update the quantity
    const item = useCartStore
      .getState()
      .items.find((item) => item.id === details.id);
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

  return (
    <div className={`flex flex-col w-1/2 bg-gray-50 ${className}`}>
      <div className="flex flex-row justify-between mb-2">
        <div>
          {details.tags.length > 0 && (
            <Tag className="bg-yellow mb-2">{details.tags[0]}</Tag>
          )}
          <b className="bodyXL text-gray-800 font-normal">
            {details.description}
          </b>
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
            <div>AED {formatPrice(details.variants.nodes[0].price.amount)}</div>
            {details.variants.nodes[0].compareAtPrice && (
              <div className="line-through text-gray-500">
                {"AED " +
                  formatPrice(details.variants.nodes[0].compareAtPrice.amount)}
              </div>
            )}
          </div>

          <b className="bodySM font-light"> (4.5 stars) 10 reviews</b>
        </div>

        <div className="flex flex-col gap-5">
          {details.options.length > 1 &&
            details.options.map((option, idx) =>
              option.name === "Color" ? (
                <div className="flex flex-col gap-2" key={option.name}>
                  <div className="flex flex-row gap-4">
                    <ColorTabs
                      tabs={option.optionValues}
                      selectedTab={selectedOptions[idx].value}
                      onChange={(value) => handleSelectOption(idx, value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2" key={option.name}>
                  <b className="bodyMD font-normal">{option.name}</b>
                  <div className="flex flex-row gap-4">
                    <ProductTabs
                      tabs={option.optionValues}
                      selectedTab={selectedOptions[idx].value}
                      onChange={(value) => handleSelectOption(idx, value)}
                    />
                  </div>
                </div>
              )
            )}
        </div>

        {selectedVariant?.quantityAvailable &&
        selectedVariant?.quantityAvailable > 0 ? (
          <div className="flex flex-row gap-4 w-full">
            <CounterButton
              min={1}
              max={selectedVariant?.quantityAvailable}
              count={quantity}
              setCount={setQuantity}
            />
            <Button className="flex items-center" onClick={addToCartHandler}>
              Add to Cart - AED{" "}
              {formatPrice(
                (Number(selectedVariant?.price.amount) * quantity).toString()
              )}
            </Button>
          </div>
        ) : (
          <Button className="w-full">Notify me when available</Button>
        )}
      </div>
    </div>
  );
}
