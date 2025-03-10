"use client";

import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs";
import ProgressBar from "@/components/subscription/ProgressBar";
import SubscriptionOptions from "@/components/subscription/SubscriptionOptions";
import TipCard from "@/components/subscription/TipCard";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SubscriptionStepEightPage() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("Small Box");

  const addToCartHandler = () => {
    console.log("here");
  };
  return (
    <div className="w-full pt-32 pb-20 bg-green-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={9} totalSteps={9} />
      <div className="flex flex-col items-center gap-2">
        <h3>Choose your plan</h3>
        <div>For subscriptions, your box will be delivered to you monthly.</div>
      </div>
      <Tabs
        tabs={["Small Box", "Large Box"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TipCard />
      <SubscriptionOptions />

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-8")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={addToCartHandler}>Add to cart</Button>
      </div>
    </div>
  );
}
