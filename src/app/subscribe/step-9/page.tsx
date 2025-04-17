"use client";

import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import PlanSelector from "@/components/subscription/PlanSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import TipCard from "@/components/subscription/TipCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useCartStore } from "@/stores/cartStore";
import { getSubscriptionPlan } from "@/utils/APIs";
export default function SubscriptionStepNinePage() {
  const router = useRouter();

  const [boxSize, setBoxSize] = useState<string>("Small Box");
  const [selectedPlan, setSelectedPlan] = useState<string>("12 months");
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const addItem = useCartStore((state) => state.addItem);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);
  useEffect(() => {
    if (!hydrated) return;

    if (!petType) {
      router.push("/subscribe/step-1");
    }
    if (
      (!storedDogCount && petType === "dog") ||
      (!storedCatCount && petType === "cat") ||
      (!storedDogCount && !storedCatCount && petType === "both")
    ) {
      router.push("/subscribe/step-2");
    }
  }, [router, storedDogCount, storedCatCount, petType, hydrated]);
  const addToCartHandler = async () => {
    //TODO need to find a way to add the notes to the item
    addItem({
      id: "gid://shopify/ProductVariant/46680266211587", //this is the variant id
      name: "Subscription Box",
      price: "0",
      compareAtPrice: "",
      quantity: 1,
      image: "https://images.omakatsepets.com/subscription-box-small.png",
      options: [],
    });
    const test = await getSubscriptionPlan();
    console.log(test);
  };

  return (
    <div className="w-full px-8 pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={9} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-bold">Choose your plan</h3>
        <div className="bodyMD">
          We&apos;ll send your box out monthly, no need to lift a paw.
        </div>
      </div>
      <Tabs
        tabs={["Small Box", "Large Box"]}
        selectedTab={boxSize}
        onChange={(tab) => setBoxSize(tab)}
        className="bg-gray-200"
      />
      <TipCard />
      <PlanSelector
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
      />

      <div className="flex flex-col sm:flex-row-reverse gap-2 sm:gap-5 w-full justify-center">
        <Button onClick={addToCartHandler}>Add to cart</Button>
        <Button
          onClick={() => router.push("/subscribe/step-8")}
          variant="secondary"
          type="button"
          bgColor="bg-green-pastel"
        >
          Previous
        </Button>
      </div>
    </div>
  );
}
