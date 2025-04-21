"use client";

import Tabs from "@/components/common/Tabs";
import PlanSelector from "@/components/subscription/PlanSelector";
import TipCard from "@/components/subscription/TipCard";
import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { getSubscriptionPlan } from "@/utils/APIs";
import { useCartStore } from "@/stores/cartStore";
import { useUIStore } from "@/stores/uiStore";
export default function ChoosePlanPage() {
  const router = useRouter();
  const [boxSize, setBoxSize] = useState<string>("Small Box");
  const [selectedPlan, setSelectedPlan] = useState<string>("12 months");
  const selectedPlanMapping: Record<string, number> = {
    "12 months": 3,
    "6 months": 2,
    "3 months": 1,
    "1 month": 0,
  };
  const { addItem } = useCartStore();
  const { openCart } = useUIStore();

  const addToCartHandler = async () => {
    const productId =
      boxSize === "Small Box"
        ? "gid://shopify/Product/8944155918595"
        : "gid://shopify/Product/8944976658691";
    const plans = await getSubscriptionPlan(productId);

    addItem({
      id:
        boxSize !== "Small Box"
          ? "gid://shopify/ProductVariant/46680266211587"
          : "gid://shopify/ProductVariant/46670734328067",
      name:
        boxSize === "Small Box"
          ? "Small Subscription Box"
          : "Large Subscription Box",
      price: "0", //TODO create box / plan to price mapping
      compareAtPrice: "",
      quantity: 1,
      sellingPlanId: plans[selectedPlanMapping[selectedPlan]],
      duration: selectedPlan,
      image:
        boxSize === "Small Box"
          ? "https://images.omakatsepets.com/subscription-box-small.png"
          : "https://images.omakatsepets.com/subscription-box-large.png",
      options: [],
    });
    openCart();
  };

  return (
    <div className="mt-28 sm:mt-48 px-6 pb-10 sm:pb-20 w-screen max-w-6xl flex flex-col gap-8">
      <button
        onClick={() => router.back()}
        className="bodyButton flex items-center gap-2 cursor-pointer w-fit"
      >
        <ChevronLeftIcon className="w-6" />
        Go back
      </button>
      <div className="flex flex-col text-center self-center gap-2">
        <h3 className="font-bold">Choose your plan</h3>
        <div className="bodyMD text-gray-800">
          We&apos;ll send your box out monthly, no need to lift a paw.
        </div>
      </div>
      <Tabs
        tabs={["Small Box", "Large Box"]}
        selectedTab={boxSize}
        onChange={(tab) => setBoxSize(tab)}
        className="bg-gray-200 w-fit self-center"
      />
      <TipCard className="bg-white w-fit self-center" />
      <PlanSelector
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />
      <div className="bodyMD text-gray-800 text-center">
        Your subscription will automatically renew at the end of the billing
        cycle.
      </div>
      <Button onClick={addToCartHandler}>Add to cart</Button>
    </div>
  );
}
