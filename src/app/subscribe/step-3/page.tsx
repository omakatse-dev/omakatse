"use client";

import Button from "@/components/common/Button";
import PetDetailsForm, {
  InitialPetDetailsSchema,
} from "@/components/subscription/PetDetailsForm";
import ProgressBar from "@/components/subscription/ProgressBar";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubscriptionStepThreePage() {
  const storedDogCount =
    useSubscriptionFormStore((state) => state.dogCount) || 0;
  const storedCatCount =
    useSubscriptionFormStore((state) => state.catCount) || 0;
  const catsDetails = useSubscriptionFormStore((state) => state.catsDetails);
  const dogsDetails = useSubscriptionFormStore((state) => state.dogsDetails);
  const petType = useSubscriptionFormStore((state) => state.petType);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);
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

  useEffect(() => {
    if (!hydrated) return;
    if (!petType) {
      router.push("/subscribe/step-1");
    }
    if (
      (!storedDogCount && petType === "dog") ||
      (!storedCatCount && petType === "cat") ||
      (!storedDogCount && !storedCatCount && petType === "both")
    ) {
      router.push("/subscribe/step-2");
    }
  }, [router, storedDogCount, storedCatCount, petType, hydrated]);

  return (
    <div className="w-full px-8 pt-32 pb-20 bg-orange-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={3} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Fill in your pets&apos; details</h3>
        <div className="bodyMD text-gray-800 text-center">
          Tell us their names and a little about them.
        </div>
      </div>
      {showError && (
        <p className="text-red-500 bodyMD">
          Please fill in all required fields for each pet before proceeding
        </p>
      )}
      <div className="flex flex-col gap-8 w-full sm:w-fit">
        {Array.from({ length: storedCatCount }).map((_, idx) => (
          <PetDetailsForm petType="Cat" key={idx} idx={idx} />
        ))}
        {Array.from({ length: storedDogCount }).map((_, idx) => (
          <PetDetailsForm key={idx} idx={idx} petType="Dog" catCount={storedCatCount} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row-reverse justify-center gap-2 sm:gap-5 w-full">
        <Button onClick={handleNext}>Next</Button>
        <Button
          onClick={() => router.push("/subscribe/step-2")}
          variant="secondary"
        >
          Previous
        </Button>
      </div>
    </div>
  );
}
