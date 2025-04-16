"use client";

import Button from "@/components/common/Button";
import FoodPreferenceSelector from "@/components/subscription/FoodPreferenceSelector";
import ProgressBar from "@/components/subscription/ProgressBar";
import { subscriptionFormSchema } from "@/schemas/SubscriptionFormSchema";
import { useSubscriptionFormStore } from "@/stores/subscriptionFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const preferenceSchema = subscriptionFormSchema.pick({
  catsDetails: true,
  dogsDetails: true,
});

export type PreferenceSchema = z.infer<typeof preferenceSchema>;

export default function SubscriptionStepSixPage() {
  const dogs = useSubscriptionFormStore((state) => state.dogsDetails) || [];
  const cats = useSubscriptionFormStore((state) => state.catsDetails) || [];
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const petType = useSubscriptionFormStore((state) => state.petType);
  const storedDogCount = useSubscriptionFormStore((state) => state.dogCount);
  const storedCatCount = useSubscriptionFormStore((state) => state.catCount);
  const hydrated = useSubscriptionFormStore((state) => state.hydrated);

  useForm<PreferenceSchema>({
    resolver: zodResolver(preferenceSchema),
  });

  const submitHandler = () => {
    // Check if all pets have valid preference selections
    const hasValidPreferences = [...cats, ...dogs].every((pet) => {
      // If preferences are not set at all, invalid
      if (!pet.preferences) return false;
      
      // If they said no to preferences, that's valid
      if (pet.preferences.true === false) return true;
      
      // If they said yes, must have at least one preference selected
      return pet.preferences.true === true && pet.preferences.preferences.length > 0;
    });

    if (!hasValidPreferences) {
      setShowError(true);
      return;
    }

    router.push("/subscribe/step-7");
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
    <div className="w-full px-8 pt-32 pb-20 bg-yellow-pastel flex flex-col items-center gap-8">
      <ProgressBar currentStep={6} totalSteps={9} className="max-w-sm" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-bold">What do your pets like to eat?</h3>
        <div className="text-gray-800 bodyMD">
          We will curate the selection based on what your pets like.
        </div>
      </div>
      <form className="flex flex-col items-center gap-8 w-full max-w-3xl">
        <div className="flex flex-col gap-8 w-full max-w-3xl">
          {cats.map((cat, idx) => (
            <FoodPreferenceSelector
              key={cat.name}
              name={cat.name}
              petType="catsDetails"
              petIndex={idx}
            />
          ))}
          {dogs.map((dog, idx) => (
            <FoodPreferenceSelector
              key={dog.name}
              name={dog.name}
              petType="dogsDetails"
              petIndex={idx}
              catCount={cats.length}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-2 sm:gap-5 w-full justify-center">
          <Button onClick={submitHandler}>Next</Button>
          <Button
            onClick={() => router.push("/subscribe/step-5")}
            variant="secondary"
          >
            Previous
          </Button>
        </div>
        {showError && (
          <div className="bodyMD text-red">
            Please fill in all required fields for each pet before proceeding
          </div>
        )}
      </form>
    </div>
  );
}
