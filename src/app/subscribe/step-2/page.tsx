"use client";

import Button from "@/components/common/Button";
import CardButton from "@/components/common/CardButton";
import ProgressBar from "@/components/subscription/ProgressBar";
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
      <div className="flex items-center gap-3 bg-gray-50 p-6 rounded-2xl">
        <div className="w-8 h-8 bg-amber-200" />
        <div className="bodyMD font-bold">Tip</div>
        <div className="bodyXS text-gray-800">
          For more than 2 pets, we recommend getting a large box to cater to all
          your fur babies.
        </div>
      </div>
      <div className="flex gap-5">
        <Button onClick={() => router.push("/subscribe/step-1")} variant="secondary">
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-3")}>
          Next
        </Button>
      </div>
    </div>
  );
}
