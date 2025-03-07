"use client";

import Button from "@/components/common/Button";
import PetSelector from "@/components/subscription/PetSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepOnePage() {
  const router = useRouter();
  return (
    <div className="w-full pt-32 pb-20 bg-yellow-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={1} totalSteps={9} />
      <h3>What kind of pets do you have?</h3>
      <PetSelector />
      <Button
        onClick={() => router.push("/subscribe/step-2")}
        className="px-32"
      >
        Next
      </Button>
    </div>
  );
}
