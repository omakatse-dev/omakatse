"use client";

import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import PlanSelector from "@/components/subscription/PlanSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import TipCard from "@/components/subscription/TipCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubscriptionStepNinePage() {
  const router = useRouter();

  const [boxSize, setBoxSize] = useState<string>("Small Box");
  const [selectedPlan, setSelectedPlan] = useState<string>("12 months");

  return (
    <div className="w-full pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={9} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2">
        <h3>Choose your plan</h3>
        <div>For subscriptions, your box will be delivered to you monthly.</div>
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

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-8")}
          variant="secondary"
          type="button"
        >
          Previous
        </Button>
        <Button>Add to cart</Button>
      </div>
    </div>
  );
}
