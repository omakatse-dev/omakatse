"use client";

import Button from "@/components/common/Button";
import PetDetailsCard from "@/components/subscription/PetDetailsCard";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepEightPage() {
  const router = useRouter();
  return (
    <div className="w-full pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={8} totalSteps={9} />
      <div className="flex flex-col items-center gap-2">
        <h3>Review your pets&apos; details</h3>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
        <PetDetailsCard />
        <PetDetailsCard />
        <PetDetailsCard />
        <PetDetailsCard />
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
