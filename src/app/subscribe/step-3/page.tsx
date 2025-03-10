"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useRouter } from "next/navigation";
import React from "react";

export default function SubscriptionStepThreePage() {
  const router = useRouter();
  return (
    <div className="w-full pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={3} totalSteps={9} />
      <h3>Fill in your pets&apos; details</h3>
      <div className="flex flex-row gap-8">
        <Card>Dog 1</Card>
        <Card variant="blue">Dog 1</Card>
        <Card variant="green">Dog 1</Card>
        <Card variant="pink">Dog 1</Card>
      </div>

      <div className="flex gap-5">
        <Button onClick={() => router.push("/subscribe/step-2")} variant="secondary">
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-4")}>Next</Button>
      </div>
    </div>
  );
}
