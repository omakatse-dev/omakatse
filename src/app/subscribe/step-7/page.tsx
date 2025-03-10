"use client";

import Button from "@/components/common/Button";
import ProgressBar from "@/components/subscription/ProgressBar";
import TreatPreferenceCard from "@/components/subscription/TreatPreferenceCard";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepSevenPage() {
  const router = useRouter();
  return (
    <div className="w-full pt-32 pb-20 bg-blue-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={7} totalSteps={9} />
      <div className="flex flex-col items-center gap-2">
        <h3>Fill in any treats and additional information</h3>
        <div className="text-gray-800 bodyLG">
          Let us know anything we need to pay special attention to!
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full max-w-3xl">
        <TreatPreferenceCard />
        <TreatPreferenceCard />
        <TreatPreferenceCard />
        <TreatPreferenceCard />
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-6")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-8")}>Next</Button>
      </div>
    </div>
  );
}
