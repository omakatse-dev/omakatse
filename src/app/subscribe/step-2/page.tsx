"use client";

import Button from "@/components/common/Button";
import CardButton from "@/components/common/CardButton";
import ProgressBar from "@/components/subscription/ProgressBar";
import TipCard from "@/components/subscription/TipCard";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepTwoPage() {
  const router = useRouter();
  return (
    <div className="w-full pt-32 pb-20 bg-blue-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={2} totalSteps={9} />
      <h3>How many dogs do you have?</h3>
      <div className="flex flex-row gap-8">
        <CardButton>
          <div className="w-48 h-48 bg-amber-300" />1 Dog
        </CardButton>
        <CardButton>
          <div className="w-48 h-48 bg-amber-300" />1 Dog
        </CardButton>
        <CardButton>
          <div className="w-48 h-48 bg-amber-300" />1 Dog
        </CardButton>
        <CardButton>
          <div className="w-48 h-48 bg-amber-300" />1 Dog
        </CardButton>
      </div>
      <TipCard />
      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-1")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-3")}>Next</Button>
      </div>
    </div>
  );
}
