"use client";

import Button from "@/components/common/Button";
import PetDetailsForm from "@/components/subscription/PetDetailsForm";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";

export default function SubscriptionStepThreePage() {
  const dogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;
  const catCount = useSubscriptionFormStore((state) => state.catCount) || 0;

  const router = useRouter();
   
  return (
    <div className="w-full pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={3} totalSteps={9} />
      <h3>Fill in your pets&apos; details</h3>
      <div className="flex flex-col gap-8">
        {Array.from({ length: catCount }).map((_, idx) => (
          <PetDetailsForm petType="Cat" idx={idx} key={idx} />
        ))}
        {Array.from({ length: dogCount }).map((_, idx) => (
          <PetDetailsForm key={idx} petType="Dog" idx={idx} />
        ))}
      </div>

      <div className="flex gap-5">
        <Button
          onClick={() => router.push("/subscribe/step-2")}
          variant="secondary"
        >
          Previous
        </Button>
        <Button onClick={() => router.push("/subscribe/step-4")}>Next</Button>
      </div>
    </div>
  );
}
