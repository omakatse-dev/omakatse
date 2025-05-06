"use client";
"use client";
import React, { useState } from "react";
import { ProductDetailsType } from "@/types/Types";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
import Button from "./Button";
import { formatPrice } from "@/utils/Utils";
import RestockModal from "../shop/ProductPage/RestockModal";
import { ProductOption } from "@/types/admin.types";

interface AddToCartSectionProps {
  details: ProductDetailsType;
  selectedOptions: ProductOption[];
  quantity: number;
  className?: string;
}

export default function AddToCartSection({
  details,
  selectedOptions,
  quantity,
  className,
}: AddToCartSectionProps) {
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
  const { openCart } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);
  const changeQuantity = useCartStore((state) => state.changeQuantity);
  const [showRestockModal, setShowRestockModal] = useState(false);

  const addToCartHandler = () => {
    // if item is already in cart, update the quantity
    console.log(selectedVariant);
    const items = useCartStore.getState().items;
    console.log(items);
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
  return (
    <div
      className={`flex flex-col md:flex-row p-6 gap-4 items-center md:justify-between md:px-12 md:py-4 bg-white w-full ${className}`}
    >
      <div className="bodyMD hidden md:block"> {details.title} </div>
      {details.tags.includes("Box Exclusive") ? (
        <Button disabled>This is a box exclusive product</Button>
      ) : selectedVariant?.quantityAvailable &&
        selectedVariant?.quantityAvailable > 0 ? (
        <div className="w-full md:w-auto">
          <Button
            className="flex items-center w-full md:w-auto"
            onClick={addToCartHandler}
          >
            Add to Cart - AED{" "}
            {formatPrice(
              (Number(selectedVariant?.price.amount) * quantity).toString()
            )}
          </Button>
        </div>
      ) : (
        <Button
          className="w-full md:w-auto"
          onClick={() => setShowRestockModal(true)}
        >
          Notify me when available
        </Button>
      )}
      {showRestockModal && (
        <RestockModal
          closeModal={() => setShowRestockModal(false)}
          variantId={selectedVariant?.id || ""}
        />
      )}
    </div>
  );
}
