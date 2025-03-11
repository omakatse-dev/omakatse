"use client";

import Button from "@/components/common/Button";
import ProgressBar from "@/components/subscription/ProgressBar";
import SizeSelector from "@/components/subscription/SizeSelector";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepFourPage() {
  const router = useRouter();

  const catCount = useSubscriptionFormStore((state) => state.catCount) || 0;
  const dogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;

  return (
    <div className="w-full pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={4} totalSteps={9} />
      <div className="flex flex-col items-center gap-2">
        <h3>What are your pets&apos; sizes?</h3>
        <div className="text-gray-800 bodyLG">
          We will curate apparel based on your pets&apos; sizes
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {Array.from({ length: catCount }).map((_, idx) => (
          <SizeSelector key={idx} />
        ))}
        {Array.from({ length: dogCount }).map((_, idx) => (
          <SizeSelector key={idx} />
        ))}
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-3")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-5")}>Next</Button>
      </div>
    </div>
  );
}
