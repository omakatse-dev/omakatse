"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import PillButton from "@/components/common/PillButton";
import AllergenSelector from "@/components/subscription/AllergySelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepFivePage() {
  const router = useRouter();
  return (
    <div className="w-full pt-32 pb-20 bg-pink-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={5} totalSteps={9} />
      <div className="flex flex-col items-center gap-2">
        <h3>What are your pets&apos; allergies?</h3>
        <div className="text-gray-800 bodyLG">
          Products containing these allergens will be removed from the box
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        <Card>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-300 mb-2" />
            <h4>Bella</h4>
            <div className="bodyMD mt-8">Does Bella have any allergies?</div>
            <div className="flex gap-4 mt-2 mb-8">
              <PillButton>Yes</PillButton>
              <PillButton>No</PillButton>
            </div>
            <AllergenSelector />
          </div>
        </Card>
        <Card variant="blue">Dog 1</Card>
        <Card variant="green">Dog 1</Card>
        <Card variant="pink">Dog 1</Card>
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-4")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-6")}>Next</Button>
      </div>
    </div>
  );
}
