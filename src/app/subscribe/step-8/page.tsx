"use client";

import Button from "@/components/common/Button";
import PetDetailsCard from "@/components/subscription/PetDetailsCard";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SubscriptionStepEightPage() {
  const router = useRouter();

  const cats = useSubscriptionFormStore(state => state.catsDetails) || [];
  const dogs = useSubscriptionFormStore(state => state.dogsDetails) || [];
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
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

  return (
    <div className="w-full pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={8} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2">
        <h3>Review your pets&apos; details</h3>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
        {cats.map((cat, idx) => (
          <PetDetailsCard key={cat.name} details={cat} idx={idx} />
        ))}
        {dogs.map((dog, idx) => (
          <PetDetailsCard key={dog.name} details={dog} idx={idx} />
        ))}
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-7")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-9")}>Next</Button>
      </div>
    </div>
  );
}
