"use client";

import Button from "@/components/common/Button";
import PetDetailsForm from "@/components/subscription/PetDetailsForm";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";

export default function SubscriptionStepThreePage() {
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount) || 0;
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount) || 0;
  const storedCats = useSubscriptionFormStore((state) => state.catsDetails);
  const storedDogs = useSubscriptionFormStore((state) => state.dogsDetails);

  const router = useRouter();

  return (
    <div className="w-full pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={3} totalSteps={9} />
      <h3>Fill in your pets&apos; details</h3>
      <div className="flex flex-col gap-8">
        {Array.from({ length: storedCatCount }).map((_, idx) => (
          <PetDetailsForm petType="Cat" key={idx} idx={idx} />
        ))}
        {Array.from({ length: storedDogCount }).map((_, idx) => (
          <PetDetailsForm key={idx} idx={idx} petType="Dog" />
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
