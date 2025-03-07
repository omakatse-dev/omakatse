"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import CardButton from "@/components/common/CardButton";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepFourPage() {
  const router = useRouter();
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
        <Card>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-300 mb-2" />
            <h4>Bella</h4>
            <div className="mt-8 flex flex-row gap-8">
              <CardButton>
                <div className="w-32 h-16 bg-amber-300 mb-4" />
                Skinny
              </CardButton>
              <CardButton>
                <div className="w-32 h-16 bg-amber-300 mb-4" />
                Just Right
              </CardButton>
              <CardButton>
                <div className="w-32 h-16 bg-amber-300 mb-4" />
                Chubby
              </CardButton>
            </div>
          </div>
        </Card>
        <Card variant="blue">Dog 1</Card>
        <Card variant="green">Dog 1</Card>
        <Card variant="pink">Dog 1</Card>
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
