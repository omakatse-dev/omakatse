"use client";

import Button from "@/components/common/Button";
import PetDetailsForm, {
  InitialPetDetailsSchema,
} from "@/components/subscription/PetDetailsForm";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubscriptionStepThreePage() {
  const storedDogCount =
    useSubscriptionFormStore((state) => state.dogCount) || 0;
  const storedCatCount =
    useSubscriptionFormStore((state) => state.catCount) || 0;
  const catsDetails = useSubscriptionFormStore((state) => state.catsDetails);
  const dogsDetails = useSubscriptionFormStore((state) => state.dogsDetails);
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  const isFormValid = () => {
    const validatePet = (pet: InitialPetDetailsSchema) => {
      return (
        pet?.name &&
        pet?.breed &&
        pet?.gender &&
        pet?.birthdayYear &&
        pet?.birthdayMonth
      );
    };

    const catsValid = Array.from({ length: storedCatCount }).every((_, idx) =>
      validatePet(catsDetails?.[idx] as InitialPetDetailsSchema)
    );

    const dogsValid = Array.from({ length: storedDogCount }).every((_, idx) =>
      validatePet(dogsDetails?.[idx] as InitialPetDetailsSchema)
    );

    return catsValid && dogsValid;
  };

  const handleNext = () => {
    if (isFormValid()) {
      router.push("/subscribe/step-4");
    } else {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={3} totalSteps={9} className="max-w-sm" />
      <h3 className="font-bold">Fill in your pets&apos; details</h3>
      {showError && (
        <p className="text-red-500 bodyMD">
          Please fill in all required fields for each pet before proceeding
        </p>
      )}
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
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
