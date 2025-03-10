"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Selector from "@/components/common/Selector";
import ProgressBar from "@/components/subscription/ProgressBar";
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
        <Card>
          <div className="flex flex-col">
            <div className="w-8 h-8 rounded-full bg-amber-300 mb-2 self-center" />
            <h4 className="self-center">Bella</h4>
            <div>
              <div className="bodyMD mt-8 text-gray-800">
                How often does Bella get treats?
              </div>
              <Selector placeholder="Treats frequency" className="w-full mt-2" />
            </div>
          </div>
        </Card>
        <Card variant="blue">Dog 1</Card>
        <Card variant="green">Dog 1</Card>
        <Card variant="pink">Dog 1</Card>
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
